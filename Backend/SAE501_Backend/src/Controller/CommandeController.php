<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\Medicament;
use App\Entity\Produit;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;



#[Route('/commande')]
class CommandeController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em, private LoggerInterface $logger)
    {
    }

    // Route pour créer une commande à partir du texte de l'ordonnance
    #[Route('/{id}/post', methods: ['POST'])]
    public function createCommande(Request $request, $id): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!$data || empty($data['text'])) {
                throw new \Exception('Le champ "text" est manquant ou vide.');
            }

            $this->logger->info('Données reçues : ', ['data' => $data]);

            $lines = explode("\n", $data['text']);
            $medicaments = [];
            $prixTotal = 0; // Initialiser le prix total

            foreach ($lines as $line) {
                if (preg_match('/^([\p{L}\p{M}\'\s\-]+)\s+\(([\d\.]+(?:mg|g|ml|mI|mL|Ul|µg))\)\s*\[Quantité:\s*(\d+)\]$/iu', $line, $matches)) {
                    $medicaments[] = [
                        'Nom' => trim($matches[1]),
                        'dosage' => trim($matches[2]),
                        'quantite' => (int) $matches[3],
                    ];
                } else {
                    $this->logger->error('Ligne non reconnue : ' . $line);
                }
            }

            if (empty($medicaments)) {
                throw new \Exception('Aucun médicament valide trouvé.');
            }

            $commande = new Commande();

            $user = $this->em->getRepository(User::class)->find($id);
            $commande->setUserId($user);
            $commande->setCreatedAt(new \DateTimeImmutable());

            $quantitesMeds = []; // Tableau pour stocker les quantités des médicaments
            $medicamentsDetails = []; // Tableau pour stocker les détails des médicaments avec prix

            foreach ($medicaments as $med) {
                // Rechercher le médicament dans la base de données par Nom et dosage
                $medicament = $this->em->getRepository(Produit::class)->findOneBy([
                    'Nom' => $med['Nom'],
                    'dosage' => $med['dosage']
                ]);

                if ($medicament) {
                    // Ajouter le médicament à la commande
                    $commande->getProducts()->add($medicament);

                    // Ajouter la quantité et d'autres détails au tableau
                    $quantitesMeds[] = [
                        'Nom' => $med['Nom'],
                        'dosage' => $med['dosage'],
                        'quantite' => $med['quantite'],
                        'prix' => $medicament->getPrix(), // Prix du médicament
                    ];

                    // Ajouter les détails du médicament pour la réponse
                    $medicamentsDetails[] = [
                        'Nom' => $med['Nom'],
                        'dosage' => $med['dosage'],
                        'quantite' => $med['quantite'],
                        'prix' => $medicament->getPrix(), // Prix du médicament
                    ];

                    // Calculer le prix total de la commande
                    $prixTotal += $medicament->getPrix() * $med['quantite'];
                } else {
                    throw new \Exception("Médicament non trouvé : {$med['Nom']} ({$med['dosage']})");
                }
            }

            $commande->setQuantite($quantitesMeds);
            $commande->setPrixTotal($prixTotal); // Stocker le prix total dans la commande

            $this->logger->info('Réponse API : ', [
                'commande_id' => $commande->getId(),
                'medicaments' => $medicamentsDetails, // Utiliser le tableau détaillé avec les prix
                'prix_total' => $prixTotal,
            ]);

            $this->em->persist($commande);
            $this->em->flush();

            return new JsonResponse([
                'commande_id' => $commande->getId(),
                'medicaments' => $medicamentsDetails, // Inclure les détails des médicaments avec prix
                'prix_total' => $prixTotal, // Inclure le prix total dans la réponse
            ]);
        } catch (\Exception $e) {
            $this->logger->error('Erreur lors de la création de la commande : ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
    // Route pour récupérer toutes les commandes
    #[Route('/get', methods: ['GET'])]
    public function getCommandes(): JsonResponse
    {
        $commandes = $this->em->getRepository(Commande::class)->findAll();
        $data = [];

        foreach ($commandes as $commande) {
            $data[] = [
                'id' => $commande->getId(),
                'quantites' => $commande->getQuantite(),
                'prix_total' => $commande->getPrixTotal(),
                'userName' => $commande->getUserId()->getName(),
                'userFirstName' => $commande->getUserId()->getFirstName(),

                // Ajoutez ici d'autres informations si nécessaire
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/userid/{id}/get', methods: ['GET'])]
    public function getCommandeByUserId(Request $request, $id): JsonResponse
    {
        $commandes = $this->em->getRepository(Commande::class)->findBy(['userId' => $id]);
        $data = [];

        foreach ($commandes as $commande) {
            $data[] = [
                'id' => $commande->getId(),
                'quantites' => $commande->getQuantite(),
                'prix_total' => $commande->getPrixTotal(),
                // Ajoutez ici d'autres informations si nécessaire
            ];
        }

        return new JsonResponse($data);
    }

    // Route pour récupérer une commande spécifique
    #[Route('/{id}/get', methods: ['GET'])]
    public function getCommande(int $id): JsonResponse
    {
        $commande = $this->em->getRepository(Commande::class)->find($id);

        if (!$commande) {
            return new JsonResponse(['message' => 'Commande non trouvée'], 404);
        }

        $data = [
            'id' => $commande->getId(),
            'quantites' => $commande->getQuantite(),
            'prix_unitaire' => $commande->getPrixTotal(),
            // Ajoutez d'autres informations si nécessaire
        ];

        return new JsonResponse($data);
    }
    // Route pour valider une commande
    #[Route('/validate/{id}/post', methods: ['POST'])]
    public function validateCommande(int $id): JsonResponse
    {
        try {
            // Trouver la commande par son ID
            $commande = $this->em->getRepository(Commande::class)->find($id);

            if (!$commande) {
                return new JsonResponse(['message' => 'Commande non trouvée.']);
            }

            // Vérifier les stocks et mettre à jour
            $quantitesMeds = $commande->getQuantite();
            foreach ($quantitesMeds as $med) {
                // Trouver le médicament dans la base de données
                $medicament = $this->em->getRepository(Produit::class)->findOneBy([
                    'Nom' => $med['Nom'],
                    'dosage' => $med['dosage']
                ]);

                if ($medicament) {
                    // Stock actuel du médicament
                    $stockActuel = $medicament->getStock();

                    // Vérifier si la quantité demandée est disponible en tenant compte du stock de sécurité
                    $stockSecurite = 10;
                    if ($med['quantite'] > ($stockActuel - $stockSecurite)) {
                        return new JsonResponse(["message" => "Stock insuffisant pour le médicament: {$med['Nom']}. Disponible: {$stockActuel}, demandé: {$med['quantite']}, stock de sécurité: {$stockSecurite}. Veuillez réessayer ultérieurement."]);
                    }

                    // Réduire le stock du médicament
                    $medicament->setStock($stockActuel - $med['quantite']);
                } else {
                    return new JsonResponse(["message" => "Médicament non trouvé: {$med['Nom']}"]);
                }
            }

            $this->em->persist($commande);
            $this->em->flush();

            // Supprimer la commande après validation
            $this->em->remove($commande);
            $this->em->flush();
            $this->addFlash('success', 'Commande validée avec succès.');
            return new JsonResponse(['message' => 'Commande validée avec succès.', 'good' => 1], 200);

        } catch (\Exception $e) {
            $this->logger->error('Erreur lors de la validation de la commande : ' . $e->getMessage());

            return new JsonResponse(['error' => 'Erreur lors de la validation de la commande.'], 500);
        }
    }


    // Route pour supprimer une commande
    #[Route('/{id}/delete', methods: ['DELETE'])]
    public function deleteCommande(int $id): JsonResponse
    {
        try {
            // Trouver la commande par son ID
            $commande = $this->em->getRepository(Commande::class)->find($id);

            if (!$commande) {
                return new JsonResponse(['message' => 'Commande non trouvée.'], 404);
            }

            // Supprimer la commande
            $this->em->remove($commande);
            $this->em->flush();

            return new JsonResponse(['message' => 'Commande supprimée avec succès.']);
        } catch (\Exception $e) {
            $this->logger->error('Erreur lors de la suppression de la commande : ' . $e->getMessage());
            return new JsonResponse(['error' => 'Erreur lors de la suppression de la commande.'], 500);
        }
    }


    #[Route('/check/{id}/post', methods: ['POST'])]
    public function checkCommande(Request $request, $id): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!$data || empty($data['text'])) {
                throw new \Exception('Le champ "text" est manquant ou vide.');
            }

            $this->logger->info('Données reçues : ', ['data' => $data]);

            $lines = explode("\n", $data['text']);
            $medicaments = [];
            $prixTotal = 0; // Initialiser le prix total

            foreach ($lines as $line) {
                if (preg_match('/^([\p{L}\p{M}\'\s\-]+)\s+\(([\d\.]+(?:mg|g|ml|mI|mL|Ul|µg))\)\s*\[Quantité:\s*(\d+)\]$/iu', $line, $matches)) {
                    $medicaments[] = [
                        'Nom' => trim($matches[1]),
                        'dosage' => trim($matches[2]),
                        'quantite' => (int) $matches[3],
                    ];
                } else {
                    $this->logger->error('Ligne non reconnue : ' . $line);
                }
            }

            if (empty($medicaments)) {
                throw new \Exception('Aucun médicament valide trouvé.');
            }

            $medicamentsDetails = []; // Tableau pour stocker les détails des médicaments avec prix

            foreach ($medicaments as $med) {
                // Rechercher le médicament dans la base de données par Nom et dosage
                $medicament = $this->em->getRepository(Produit::class)->findOneBy([
                    'Nom' => $med['Nom'],
                    'dosage' => $med['dosage']
                ]);

                if ($medicament) {
                    // Stock actuel du médicament
                    $stockActuel = $medicament->getStock();

                    // Vérifier si la quantité demandée est disponible en tenant compte du stock de sécurité
                    $stockSecurite = 10;
                    if ($med['quantite'] > ($stockActuel - $stockSecurite)) {
                        $medicamentsDetails[] = [
                            'Nom' => $med['Nom'],
                            'dosage' => $med['dosage'],
                            'quantite' => "indisponible",
                            'prix' => $medicament->getPrix(),
                        ];
                    } else {
                        $medicamentsDetails[] = [
                            'Nom' => $med['Nom'],
                            'dosage' => $med['dosage'],
                            'quantite' => $med['quantite'],
                            'prix' => $medicament->getPrix(),
                        ];
                    }

                    // Calculer le prix total de la commande
                    $prixTotal += $medicament->getPrix() * $med['quantite'];
                } else {
                    throw new \Exception("Médicament non trouvé : {$med['Nom']} ({$med['dosage']})");
                }
            }


            $this->logger->info('Réponse API : ', [
                'medicaments' => $medicamentsDetails, // Utiliser le tableau détaillé avec les prix
                'prix_total' => $prixTotal,
            ]);

            return new JsonResponse([
                'medicaments' => $medicamentsDetails, // Inclure les détails des médicaments avec prix
                'prix_total' => $prixTotal, // Inclure le prix total dans la réponse
            ]);
        } catch (\Exception $e) {
            $this->logger->error('Erreur lors de la création de la commande : ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
}
