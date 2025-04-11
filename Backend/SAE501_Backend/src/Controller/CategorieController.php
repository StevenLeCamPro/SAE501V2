<?php

namespace App\Controller;

use App\Entity\Categorie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategorieController extends AbstractController
{
    #[Route('/categorie/post', name: 'create_category', methods: ['POST'])]
    public function CreateCategory(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $category = new Categorie();

        $category->setNom($data['name']);

        $em->persist($category);
        $em->flush();
        return $this->json(['message' => 'Catégorie créée avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/categorie/get', name: 'get_categories', methods: ['GET'])]
    public function GetCategories(Request $request, EntityManagerInterface $em): Response
    {
        $categories = $em->getRepository(Categorie::class)->findAll();
        if ($categories) {
            $data = array_map(function ($category) {
                return [
                    'id' => $category->getId(),
                    'nom' => $category->getNom(),
                ];
            }, $categories);
            return $this->json($data, Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de categories trouvées'], Response::HTTP_OK);
        }
    }

    #[Route('/categorie/{id}/get', name: 'get_categorie_by_id', methods: ['GET'])]
    public function GetCategorieById(Request $request, EntityManagerInterface $em, $id): Response
    {
        $categories = $em->getRepository(Categorie::class)->find($id);
        if ($categories) {
            $data = [
                'id' => $categories->getId(),
                'nom' => $categories->getNom(),
            ];
            return $this->json([$data], Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de categorie trouvée'], Response::HTTP_OK);
        }
    }

    #[Route('/categorie/{id}/put', name: 'put_categorie_by_id', methods: ['PUT'])]
    public function PutCategorieById(Request $request, EntityManagerInterface $em, $id): Response
    {
        $categorie = $em->getRepository(Categorie::class)->find($id);

        if ($categorie) {
            $data = json_decode($request->getContent(), true);

            if (isset($data['name'])) {
                $categorie->setNom($data['name']);

                $em->persist($categorie);
                $em->flush();

                return $this->json(['message' => 'Categorie mise à jour avec succès'], Response::HTTP_OK);
            } else {
                return $this->json(['message' => 'Le champ "name" est requis'], Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->json(['message' => 'Pas de categorie trouvée'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/categorie/{id}/delete', name: 'delete_categorie_by_id', methods: ['DELETE'])]
    public function DeleteCategorieById(EntityManagerInterface $em, $id): Response
    {
        $categorie = $em->getRepository(Categorie::class)->find($id);

        if ($categorie) {
            $em->remove($categorie);
            $em->flush();

            return $this->json(['message' => 'Categorie supprimée avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de categorie trouvée'], Response::HTTP_NOT_FOUND);
    }
}
