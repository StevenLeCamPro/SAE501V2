<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Produit;
use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Psr\Log\LoggerInterface;

class ProduitController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em, private LoggerInterface $logger) {}

    #[Route('/produit/post', name: 'create_produit', methods: ['POST'])]
    public function CreateProduit(Request $request, EntityManagerInterface $em): Response
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['nom'], $data['description'], $data['prix'], $data['dosage'], $data['stock'], $data['categorie'])) {
                return $this->json(['message' => 'Tous les champs requis doivent être remplis'], Response::HTTP_BAD_REQUEST);
            }

            $nom = $data['nom'];
            $dosage = $data['dosage'];

            $existing = $em->getRepository(Produit::class)->findBy([
                'Nom' => $nom,
                'dosage' => $dosage
            ]);

            if ($existing) {
                return $this->json(['message' => 'Produit existe déjà'], Response::HTTP_CONFLICT);
            }

            $produit = new Produit();
            $produit->setNom($data['nom']);
            $produit->setDescription($data['description']);
            $produit->setPrix($data['prix']);
            $produit->setDosage($data['dosage']);
            $produit->setStock($data['stock']);

            foreach ($data['categorie'] as $categorieId) {
                $category = $em->getRepository(Categorie::class)->find($categorieId);
                if ($category) {
                    $produit->getCategorie()->add($category);
                }
            }

            if (isset($data['imageId'])) {
                $image = $em->getRepository(Image::class)->find($data['imageId']);
                if ($image) {
                    $produit->setImage($image);
                }
            }

            $em->persist($produit);
            $em->flush();
            return $this->json(['message' => 'Produit créé avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            $this->logger->error('Erreur lors de la création du produit : ' . $e->getMessage());
            return new JsonResponse(['error' => 'Erreur lors de la création du produit'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    #[Route('/produit/pdf/post', name: 'create_produit_pdf', methods: ['POST'])]
    public function processOrdonnance(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérification si le texte est bien extrait
        if (!$data || !isset($data['text']) || empty(trim($data['text']))) {
            return new JsonResponse(['message' => 'Le fichier ne contient pas de texte valide.'], 400);
        }
    
        $text = $data['text'];
    
        // Sauvegarde pour le débogage (permet de voir ce qui est extrait du PDF)
        file_put_contents('debug_text.txt', $text);
    
        $lines = explode("\n", $text);
        $medicaments = [];
        $erreurs = [];
        $matchCount = 0;
    
        // Convertir chaque ligne en UTF-8 et vérifier l'encodage
        foreach ($lines as &$line) {
            $converted = mb_convert_encoding($line, 'UTF-8', 'auto');
            if ($converted === false) {
                return new JsonResponse(['message' => 'Erreur d’encodage du texte.'], 400);
            }
            $line = $converted;
        }
    
        // Traitement des lignes
        foreach ($lines as $line) {
            if (preg_match(
                '/^([\p{L}\p{M}\'\s\-]+)\s+\(([\d\.]+(?:mg|g|ml|mI|mL|Ul|µg))\):\s+(.*)\s+\[Stock:\s*(\d+)\]\s+\[Prix:\s*([\d\.]+)\]$/iu',
                $line,
                $matches
            )) {
                $matchCount++;
    
                $nom = trim($matches[1]);
                $dosage = trim($matches[2]);
                $description = trim($matches[3]);
                $stockAjoute = (int)$matches[4];
                $prix = (float)$matches[5];
    
                $medicament = $em->getRepository(Produit::class)->findOneBy([
                    'Nom' => $nom,
                    'dosage' => $dosage
                ]);
    
                if (!$medicament) {
                    $medicament = new Produit();
                    $medicament->setNom($nom);
                    $medicament->setDosage($dosage);
                    $medicament->setDescription($description);
                    $medicament->setStock($stockAjoute);
                    $medicament->setPrix($prix);
                    $em->persist($medicament);
                } else {
                    $medicament->setStock($medicament->getStock() + $stockAjoute);
    
                    if ($medicament->getPrix() === null || $medicament->getPrix() === 0.0) {
                        $medicament->setPrix($prix);
                    }
                }
    
                $medicaments[] = [
                    'nom' => $medicament->getNom(),
                    'dosage' => $medicament->getDosage(),
                    'instructions' => $medicament->getDescription(),
                    'stock' => $medicament->getStock(),
                    'prix' => $medicament->getPrix(),
                ];
            } else {
                $erreurs[] = $line; // Stocker les lignes non reconnues
            }
        }
    
        // Vérifier si au moins un médicament a été extrait
        if ($matchCount === 0) {
            return new JsonResponse(['message' => 'Aucun médicament détecté. Vérifiez le format du fichier.'], 400);
        }
    
        // Sauvegarder uniquement les nouveaux médicaments
        $em->flush();
    
        // Retourner la réponse
        return new JsonResponse(['medicaments' => $medicaments, 'erreurs' => $erreurs]);
    }

    #[Route('/produit/get', name: 'get_produits', methods: ['GET'])]
    public function GetProduit(Request $request, EntityManagerInterface $em): Response
    {
        $produits = $em->getRepository(Produit::class)->findAll();
        if ($produits) {
            $data = array_map(function ($produit) {
                if ($produit->getImage()) {
                    $image = $produit->getImage();
                    $imageId = $image->getId();
                    $path = $image->getPath();
                } else {
                    $imageId = null;
                    $path = null;
                }
                return [
                    'id' => $produit->getId(),
                    'nom' => $produit->getNom(),
                    'description' => $produit->getDescription(),
                    'image' => $path,
                    'imageId' => $imageId,
                    'prix' => $produit->getPrix(),
                    'dosage' => $produit->getDosage(),
                    'stock' => $produit->getStock() <= 10 ? '0' : $produit->getStock(),
                    'categorie' => $produit->getCategorie()->map(fn(Categorie $categorie) => $categorie->getId())->toArray(),
                    'categorieName' => $produit->getCategorie()->map(fn(Categorie $categorie) => $categorie->getNom())->toArray()
                ];
            }, $produits);
            return $this->json($data, Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de produits trouvés'], Response::HTTP_OK);
        }
    }

    #[Route('/produit/{id}/get', name: 'get_produit_by_id', methods: ['GET'])]
    public function GetProduitById(Request $request, EntityManagerInterface $em, $id): Response
    {
        $produits = $em->getRepository(Produit::class)->find($id);
        if ($produits) {

            if ($produits->getImage()) {
                $image = $produits->getImage();
                $imageId = $image->getId();
                $path = $image->getPath();
            } else {
                $imageId = null;
                $path = null;
            }

            $data = [
                'id' => $produits->getId(),
                'nom' => $produits->getNom(),
                'description' => $produits->getDescription(),
                'image' => $path,
                'imageId' => $imageId,
                'prix' => $produits->getPrix(),
                'dosage' => $produits->getDosage(),
                'stock' => $produits->getStock(),
                'categorie' => $produits->getCategorie()->map(fn(Categorie $categorie) => $categorie->getNom())->toArray()
            ];

            return $this->json([$data], Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de produits trouvés'], Response::HTTP_OK);
        }
    }

    #[Route('/produit/{id}/put', name: 'put_produit_by_id', methods: ['PUT'])]
    public function PutProduitById(Request $request, EntityManagerInterface $em, $id): Response
    {
        $produit = $em->getRepository(Produit::class)->find($id);

        if ($produit) {
            $data = json_decode($request->getContent(), true);

            if (isset($data['nom'])) {
                $produit->setNom($data['nom']);
            } else {
                return $this->json(['message' => 'Le champ "nom" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['description'])) {
                $produit->setDescription($data['description']);
            } else {
                return $this->json(['message' => 'Le champ "description" est requis'], Response::HTTP_BAD_REQUEST);
            }
            
            $produit->setPrix($data['prix']);

            if (isset($data['dosage'])) {
                $produit->setDosage($data['dosage']);
            } else {
                return $this->json(['message' => 'Le champ "dosage" est requis'], Response::HTTP_BAD_REQUEST);
            }
            if (isset($data['stock'])) {
                $produit->setStock($data['stock']);
            } else {
                return $this->json(['message' => 'Le champ "stock" est requis'], Response::HTTP_BAD_REQUEST);
            }
            

            if (isset($data['categorie'])) {
                $categories = is_array($data['categorie']) ? $data['categorie'] : [$data['categorie']];
                
                
                foreach ($produit->getCategorie() as $existingCategory) {
                    $produit->getCategorie()->removeElement($existingCategory);
                }
                foreach ($categories as $categorieId) {
                    $category = $em->getRepository(Categorie::class)->find($categorieId);
                    if ($category) {
                        $produit->getCategorie()->add($category);
                    }
                }
            }
            if ($data['imageId']) {
                $image = $em->getRepository(Image::class)->find($data['imageId']);
                if ($image) {
                    $produit->setImage($image);
                }
            }

            $em->persist($produit);
            $em->flush();

            return $this->json(['message' => 'Produit mis à jour avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de produit trouvé'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/produit/{id}/delete', name: 'delete_product_by_id', methods: ['DELETE'])]
    public function DeleteProduitById(EntityManagerInterface $em, $id): Response
    {
        $categorie = $em->getRepository(Produit::class)->find($id);

        if ($categorie) {
            $em->remove($categorie);
            $em->flush();

            return $this->json(['message' => 'Produit supprimé avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de produit trouvée'], Response::HTTP_NOT_FOUND);
    }
}
