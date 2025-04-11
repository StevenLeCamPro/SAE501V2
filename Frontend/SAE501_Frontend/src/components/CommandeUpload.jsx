import React, { useState, useEffect} from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import Tesseract from 'tesseract.js';
import Api from './Api';
import Cookies from 'js-cookie';
import useCheckRole from './ReadCookie';
import { useNavigate } from 'react-router-dom';
// Définir le chemin vers le worker pour pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs';
// le but du worker est de relayer les fonctions gourmandes dans un traitement 
// à part pour ne pas bloquer le traitement principal
// cela permet d'améliorer les performanes, 
// et de répartir la charge de travail, comme son nom l'indique.

function CommandeUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [commandeId, setCommandeId] = useState(null);
    const [medicaments, setMedicaments] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        const role = useCheckRole(1);
        if (role === 0) {
            navigate("/login");
        } 
    }, []);

    const handleFileUpload = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        if (!file) {
            setError("Veuillez sélectionner un fichier."); // Affiche une erreur si aucun fichier n'est sélectionné
            return;
        }
    
        setLoading(true); // Indique que le chargement est en cours
        setError(null); // Réinitialise les erreurs précédentes
        setSuccessMessage(null); // Réinitialise les messages de succès précédents
    
        try {
            const fileReader = new FileReader(); // Crée un nouveau FileReader pour lire le fichier
            fileReader.onload = async () => {
                try {
                    document.querySelector("button[type='submit']").disabled = true; // Désactive le bouton d'envoi
                    const pdfData = new Uint8Array(fileReader.result); // Convertit le fichier en Uint8Array
                    const pdf = await pdfjsLib.getDocument(pdfData).promise; // Charge le document PDF
    
                    const extractedTexts = []; // Tableau pour stocker les textes extraits
    
                    for (let i = 1; i <= pdf.numPages; i++) { // Récupère chaque page du PDF
                        const page = await pdf.getPage(i); // Récupère la page actuelle
                        const viewport = page.getViewport({ scale: 2 }); // Définit le viewport pour le rendu
                        const canvas = document.createElement("canvas"); // Crée un élément canvas
                        const context = canvas.getContext("2d"); // Récupère le contexte 2D du canvas pour le rendu
                        canvas.width = viewport.width; // Définit la largeur du canvas
                        canvas.height = viewport.height; // Définit la hauteur du canvas
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };
                        await page.render(renderContext).promise; // Rend la page sur le canvas
                        const imageData = canvas.toDataURL("image/png"); // Convertit le canvas en image PNG
                        console.log(`Analyse de la page ${i} en cours...`); // Log l'état de l'analyse de la page actuelle
    
                        const result = await Tesseract.recognize(imageData, "fra", {
                            logger: (m) => console.log(m), // Log les messages de progression de Tesseract
                        });
    
                        const extractedText = result.data.text; // Récupère le texte extrait par Tesseract
                        const normalizedText = extractedText.normalize("NFC"); // Normalise le texte extrait pour éviter les problèmes d'encodage
                        extractedTexts.push(normalizedText); // Ajoute le texte extrait au tableau
                        setSuccessMessage(`Analyse de la page ${i}/${pdf.numPages} en cours...`); // Met à jour le message de succès
                    

                    }
    
                    const fullText = extractedTexts.join("\n"); // Concatène tous les textes extraits
                    console.log("Texte extrait complet :", fullText); // Log le texte complet extrait

                    const userCookie = Cookies.get("pharminnov_login");
                    const { user_id } = JSON.parse(userCookie);
                        
                    const response = await Api("commande", "post", user_id, { text: fullText }); // Envoie le texte extrait à l'API
                    setMedicaments(response.medicaments); // Met à jour les médicaments avec la réponse de l'API
                    setCommandeId(response.commandeId); // Met à jour l'ID de la commande avec la réponse de l'API
                    setSuccessMessage("Demande traitée avec succès."); // Affiche un message de succès
                    setTimeout(() => {
                        navigate(`/commande/liste`); // Redirige l'utilisateur vers la page de la commande après 0,5 seconde
                    }, 500);
                   
                } catch (extractionError) {
                    console.error("Erreur pendant l'extraction : ", extractionError); // Log l'erreur d'extraction
                    setError("Le fichier ne convient pas à nos paramètres. Vérifiez sa composition"); // Affiche un message d'erreur
                    setSuccessMessage(false);
                    document.querySelector("button[type='submit']").disabled = false; 
                } finally {
                    setLoading(false); // Indique que le chargement est terminé
                }
            };
    
            fileReader.readAsArrayBuffer(file); // Lit le fichier en tant que ArrayBuffer
        } catch (err) {
            console.error("Erreur globale :", err); // Log l'erreur globale
            setError("Une erreur est survenue lors de l'envoi."); // Affiche un message d'erreur
            setLoading(false); // Indique que le chargement est terminé
        }
    };
        

    return (
        <div className="relative min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
            <div className="flex-1 flex items-center justify-center relative z-10 px-4">
                <div className="absolute inset-0 bg-black opacity-65 z-0"></div>
                <form onSubmit={handleFileUpload} className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-md z-10">
                    <h2 className="text-3xl text-center font-semibold pb-4">Uploader une ordonnance</h2>
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-800 transition duration-200"
                    >
                        Envoyer le fichier
                    </button>
                    
                    {/* Messages de feedback */}
                    <div className="w-full max-w-md mt-4">
                        {loading && <p className="text-emerald-600">Demande en cours...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CommandeUpload;
