<?php

namespace App\Controller;
use App\Entity\UserToken;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
class AuthController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em
    ): Response {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setEmail($data['email']);
        $user->setName($data['nom']);
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $user->setPassword($hashedPassword);
        $user->setRoles(1);
        $em->persist($user);
        $em->flush();
        return $this->json(
            ['message' => 'Utilisateur créé avec succès'],
            Response::HTTP_CREATED
        );
    }


    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json(['error' => 'Votre email ou mot de passe est incorrect'], 401);
        }

        $token = bin2hex(random_bytes(32));
        $tokenDate = new \DateTimeImmutable();

        $userToken = new UserToken();
        $userToken->setUser($user);
        $userToken->setToken($token);
        $userToken->setCreatedAt($tokenDate);

        $em->persist($userToken);
        $em->flush();

        return $this->json([
            'user_id' => $user->getId(),
            'role' => $user->getRoles(),
            'date' => $tokenDate->format('Y-m-d H:i:s'),
            'token' => $token,
        ]);
    }

    #[Route('/token/post', name: 'tokenValidator', methods: ['POST'])]
    public function tokenValidator(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['auth_data'])) {
            return $this->json(['error' => 'Invalid request data'], 400);
        }

        $cookieData = $data['auth_data'];

        $tokenId = $cookieData['token'] ?? null;
        $userId = $cookieData['user_id'] ?? null;
        $role = $cookieData['role'] ?? null;
        $date = $cookieData['date'] ?? null;

        if (!$tokenId || !$userId || !$role || !$date) {
            return $this->json(['error' => 'Incomplete authentication data'], 400);
        }

        $token = $em->getRepository(UserToken::class)->findOneBy([
            'token' => $tokenId,
            'User' => $userId,
            'createdAt' => new \DateTimeImmutable($date),
        ]);

        if (!$token || $token->getUser()->getRoles() !== $role) {
            return $this->json(['error' => 'Permission Denied'], 401);
        }

        return $this->json(['success' => 'Token is valid']);
    }

}
