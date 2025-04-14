<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;
use App\Entity\UserToken;

class UserController extends AbstractController
{
    #[Route('/user/get', name: 'list_users', methods: ['GET'])]
    public function listUsers(UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        // $this->denyAccessUnlessGranted('ROLE_ADMIN');
        // $users = $userRepository->findAll();
        // return $this->json($users);
        $users = $em->getRepository(User::class)->findAll();
        if ($users) {
            $data = array_map(function ($user) {
                return [
                    'id' => $user->getId(),
                    'name' => $user->getName(),
                    'firstName' => $user->getFirstName(),
                    'email' => $user->getEmail(),
                    'birthDate' => $user->getBirthDate(),
                    'phone'=> $user->getPhone(),
                    'roles'=> $user->getRoles(),
                    'address'=> $user->getAddress(),
                    'createdAt'=> $user->getCreatedAt(),
                ];
            }, $users);
            return $this->json($data, Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de categories trouvées'], Response::HTTP_OK);
        }
    }

    #[Route('/user/{id}/get', name: 'view_profile', methods: ['GET'])]
    public function viewProfile(Request $request, EntityManagerInterface $em, $id): Response
    {
        // $user = $this->getUser();
        // return $this->json($user);

        $user = $em->getRepository(User::class)->find($id);
        if ($user) {
            $data = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'firstName' => $user->getFirstName(),
                'email' => $user->getEmail(),
                'birthDate' => $user->getBirthDate(),
                'phone'=> $user->getPhone(),
                'roles'=> $user->getRoles(),
                'address'=> $user->getAddress(),
                'createdAt'=> $user->getCreatedAt(),
            ];
            return $this->json([$data], Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de categorie trouvée'], Response::HTTP_OK);
        }
    }

    #[Route('/user/{id}/put', name: 'edit_profile', methods: ['PUT'])]
    public function editProfile(Request $request, EntityManagerInterface $em, UserRepository $userRepository, $id): Response {
    

        $users = $em->getRepository(User::class)->find($id);

        if ($users) {
            $data = json_decode($request->getContent(), true);

            if (isset($data['name'])) {
                $users->setName($data['name']);
            } else {
                return $this->json(['message' => 'Le champ "name" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['firstName'])) {
                $users->setFirstName($data['firstName']);
            } else {
                return $this->json(['message' => 'Le champ "firstName" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['email'])) {
                $users->setEmail($data['email']);
            } else {
                return $this->json(['message' => 'Le champ "email" est requis'], Response::HTTP_BAD_REQUEST);
            }

        $existingUser = $userRepository->findOneBy(['email' => $data['email']]);
        if ($existingUser && $existingUser->getId() !== $users->getId()) {
            return new JsonResponse(['email' => 'L\'email est déjà utilisée', 'good' => 1], 200);
        }
        if (isset($data['phone'])) {
            $users->setPhone($data['phone']);
        } else {
                return $this->json(['message' => 'Le champ "phone" est requis'], Response::HTTP_BAD_REQUEST);
        }
        if (isset($data['address'])) {
            $users->setAddress($data['address']);
        } else {
            return $this->json(['message' => 'Le champ "address" est requis'], Response::HTTP_BAD_REQUEST);
        }
            
            $em->persist($users);
            $em->flush();

            return $this->json(['message' => 'L\'utilisateur a bien été modifié'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de user trouvée'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/user/post', name: 'create_user', methods: ['POST'])]
    public function createUser(Request $request, EntityManagerInterface $em, UserRepository $userRepository): Response {
        $data = json_decode($request->getContent(), true);

        if ($data['password'] != $data['confirmPassword']) {
            return $this->json(['message' => 'Le mot de passe et la confirmation de mot de passe ne correspondent pas'], Response::HTTP_BAD_REQUEST);
        }

        $existingUser = $userRepository->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['email' => 'L\'email est déjà utilisée'], 200);
        }

        $user = new User();

        $user->setName($data['name']);
        $user->setFirstName($data['firstName']);
        $user->setBirthDate(new \DateTime($data['birthDate']));
        $user->setPhone($data['phone']);
        $user->setAddress($data['address']);
        $user->setEmail($data['email']);
        $currentDateTime = new \DateTimeImmutable('now');
        $currentDateTime->format('Y-m-d');
        $user->setCreatedAt($currentDateTime);
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $user->setPassword($hashedPassword);
        $user->setRoles(1);

        $em->persist($user);
        $em->flush();
        return $this->json(['message' => 'Utilisateur créé avec succès']);
    }

    #[Route('/user/{id}/delete', name: 'delete_user_by_id', methods: ['DELETE'])]
    public function DeleteCategorieById(EntityManagerInterface $em, $id): Response
    {
        $user = $em->getRepository(User::class)->find($id);
        $token = $em->getRepository(UserToken::class)->findOneBy(['User' => $user->getId()]);

        if ($token) {
            $em->remove($token);
            $em->flush();
        }  
        if ($user) { 
            $em->remove($user);    
            $em->flush();
            return $this->json(['message' => 'Utilisateur supprimé avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas d\'utilisateur trouvé'], Response::HTTP_NOT_FOUND);
    }
}
