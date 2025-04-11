<?php

namespace App\Controller;

use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{
    #[Route('/image/post', name: 'upload_base64', methods: ['POST'])]
    public function uploadBase64(Request $request, EntityManagerInterface $em): Response {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['filename']) || !isset($data['filedata'])) {
            return $this->json(['error' => 'Invalid payload'], 400);
        }

        $fileData = base64_decode($data['filedata']);
        if ($fileData === false) {
            return $this->json(['error' => 'Invalid base64 data'], 400);
        }

        $uploadDir = $this->getParameter('upload_directory');

        $filename = uniqid() . '-' . $data['filename'];
        $filePath = $uploadDir . '/' . $filename;

        file_put_contents($filePath, $fileData);

        $image = new Image();
        $image->setPath('/uploads/' . $filename);
        
        $currentDateTime = new \DateTimeImmutable('now');
        $currentDateTime->format('Y-m-d');
        $image->setUploadedAt($currentDateTime);

        $em->persist($image);
        $em->flush();

        return $this->json(['message' => 'File uploaded successfully', 'path' => '/uploads/' . $filename, 'id' => $image->getId()], 200);
    }

    #[Route('/image/get', name: 'get_image', methods: ['GET'])]
    public function GetImages(Request $request, EntityManagerInterface $em): Response
    {
        $images = $em->getRepository(Image::class)->findAll();
        if ($images) {
            $data = array_map(function ($image) {
                return [
                    'id' => $image->getId(),
                    'path' => $image->getPath(),
                ];
            }, $images);
            return $this->json($data, Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas d\'images trouvées'], Response::HTTP_OK);
        }
    }
}
