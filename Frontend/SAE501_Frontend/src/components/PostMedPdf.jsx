import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import Tesseract from 'tesseract.js';
import Api from './Api';
import { useNavigate } from 'react-router-dom';
// Définir le chemin vers le worker pour pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs';
// le but du worker est de relayer les fonctions gourmandes dans un traitement 
// à part pour ne pas bloquer le traitement principal
// cela permet d'améliorer les performanes, 
// et de répartir la charge de travail, comme son nom l'indique.


function PostMedPdf() {
    const [loading, setLoading] = useState(false); // État pour le loader
    const [error, setError] = useState(null); // État pour les erreurs
    const [file, setFile] = useState(); // État pour le fichier sélectionné
    const [successMessage, setSuccessMessage] = useState(null); // Message de succès

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Met à jour le fichier sélectionné
    };

    const handleFileUpload = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        if (!file) {
            setError("Veuillez sélectionner un fichier."); // Si aucun fichier n'est sélectionné
            return;
        }
    
        setLoading(true); // Active le loader
        setError(null); // Réinitialise les erreurs
        setSuccessMessage(null); // Réinitialise le message de succès
    
        try {
            document.querySelector("button[type='submit']").disabled = true;
            const fileReader = new FileReader(); // Crée un nouveau FileReader pour lire le fichier
            const readFile = new Promise((resolve, reject) => {
                fileReader.onload = () => resolve(fileReader.result); // Résout la promesse lorsque le fichier est lu
                fileReader.onerror = () => 
                    reject(new Error("Erreur lors de la lecture du fichier.")); // Rejette la promesse en cas d'erreur
            });
            fileReader.readAsArrayBuffer(file); // Lit le fichier en tant que ArrayBuffer (binaire)
            const pdfData = new Uint8Array(await readFile); // Attend que le fichier soit lu et le convertit en Uint8Array (tableau de nombres entiers)
            const pdf = await pdfjsLib.getDocument(pdfData).promise; // Charge le document PDF
            console.log(`PDF chargé avec ${pdf.numPages} pages.`); // Affiche le nombre de pages du PDF
            const extractedTexts = []; // Tableau pour stocker les textes extraits
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i); // Récupère chaque page du PDF
                const viewport = page.getViewport({ scale: 2 }); // Définit le viewport pour le rendu de la page
                const canvas = document.createElement("canvas"); // Crée un élément canvas qui servira de conteneur pour le rendu
                const context = canvas.getContext("2d"); // Récupère le contexte 2D du canvas pour le rendu
                canvas.width = viewport.width; // Définit la largeur du canvas 
                canvas.height = viewport.height; // Définit la hauteur du canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise; // Rend la page dans le canvas
                const imageData = canvas.toDataURL("image/png"); // Convertit le canvas en image PNG
                console.log(`Analyse de la page ${i} en cours...`); // Affiche un message indiquant l'analyse de la page actuelle

                const result = await Tesseract.recognize(imageData, "fra", {
                    logger: (m) => console.log(m), 
                    // log des messages de progession de Tesseract
                });
                const extractedText = result.data.text; // Récupère le texte extrait par Tesseract
                const normalizedText = extractedText.normalize("NFC"); // Normalise le texte extrait pour éviter les problèmes d'encodage
                extractedTexts.push(normalizedText); // Ajoute le texte normalisé au tableau
                setSuccessMessage(`Analyse de la page ${i}/${pdf.numPages} en cours...`); // Met à jour le message de succès
            }
            const fullText = extractedTexts.join("\n"); // Joint tous les textes extraits en une seule chaîne
            console.log("Texte extrait complet :", fullText); // Affiche le texte extrait complet
            // Envoi à l'API Symfony
            const response = await Api("produit/pdf", "post", null, { text: fullText }); // Envoie le texte extrait à l'API
            setSuccessMessage("Demande traitée avec succès."); // Affiche un message de succès
            setTimeout(() => {
                navigate(`/dashboard`); // Redirige l'utilisateur vers la page de la commande après 0,5 seconde
            }, 500); // Redirige vers la page des produits après 0,5 secondes
        } catch (err) {
            console.error("Erreur :", err); // Affiche l'erreur dans la console
            setError("Le fichier ne peut pas être lu. Vérifiez la composition du fichier."); // Affiche un message d'erreur
            setSuccessMessage(false);
            document.querySelector("button[type='submit']").disabled = false; 
        } finally {
            setLoading(false); // Désactive le loader, quoi qu'il arrive
        }
    };
    

    return (
        <div>
        <div className='flex justify-center items-center'>
            <form onSubmit={handleFileUpload} className="w-full max-w-md ">
                <h2 className="text-3xl text-center font-semibold pb-4">Envoyer le fichier fournisseur</h2>
                <p className="text-center text-gray-500">Entrez directement un fichier pdf afin de créer des produits ou d'incrémenter le stock.</p>
                <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <button 
                    type="submit" 
                    className="w-full sm:w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white hover:bg-emerald-700"
                >
                    Envoyer le fichier
                </button>
            </form>
            
        </div>
        <div className='flex justify-center items-center'>
        {loading && <p className="text-emerald-600 mt-4">Demande en cours...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
        </div>
    );
}

export default PostMedPdf;
