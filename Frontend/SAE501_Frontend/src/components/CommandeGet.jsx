import { NavLink, useNavigate } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";
import roleValidator from "./CookieValidator";
import useCheckRole from "./ReadCookie";
import Cookies from 'js-cookie';
import { useFlashMessage } from "../context/FlashMessageContext";

function CommandeGet() {
    const [commandes, setCommandes] = useState([]); // Initialisation avec un tableau vide
    const navigate = useNavigate();
    const userCookie = Cookies.get("pharminnov_login");
    let user_id = null;
    if (userCookie) {
        const parsedCookie = JSON.parse(userCookie);
        user_id = parsedCookie.user_id;
    }
    const { message, addFlashMessage } = useFlashMessage();

    // Fonction pour récupérer les commandes
    const fetchCommandes = async () => {
        try {
            const result = await Api("commande/userid", "get", user_id, null);
            setCommandes(Array.isArray(result) ? result : []); // Assurez-vous que le résultat est un tableau
        } catch (error) {
            console.error("Error fetching commandes:", error);
            setCommandes([]); // Définit un tableau vide en cas d'erreur
        }
    };

    // Fonction pour valider la commande
    const handleValidateCommande = async (commandeId) => {
        try {
            const result = await Api("commande/validate", "post", commandeId, null);
            console.log(result);
            
            if (result.good){
                setCommandes((prevCommandes) => prevCommandes.filter((commande) => commande.id !== commandeId));
                addFlashMessage("Commande validée avec succès.", "success");   
            }else{
            addFlashMessage(result.message || "Erreur lors de la validation de la commande.", "error");
            }

        } catch (err) {
            console.error("Erreur lors de la validation de la commande", err);
            addFlashMessage("Erreur lors de la validation de la commande.", "error");
        }
    };

    // Fonction pour supprimer la commande
    const handleDeleteCommande = async (commandeId) => {
        try {
            await Api("commande", "delete", commandeId, null);
            addFlashMessage("Commande supprimée avec succès.", "success");
            setCommandes((prevCommandes) => prevCommandes.filter((commande) => commande.id !== commandeId));
        } catch (err) {
            console.error("Erreur lors de la suppression de la commande", err);
            addFlashMessage("Erreur lors de la suppression de la commande.", "error");
        }
    };

    useEffect(() => {
        const checkAccess = async () => {
            const access = await roleValidator(1);
            console.log(access);

            if (!access) {
                navigate('/login');
                return;
            }

            const role = useCheckRole(1);
            if (role === 0) {
                navigate("/login");
            }

            fetchCommandes();
        };
        checkAccess();
    }, [navigate]);

    return (
        <div className="bg-orange-100 pb-10 min-h-[80vh]">
             {message && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white text-green-600 text-center p-5 font-semibold shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
      {message}
      </div>
            </div>
                )}
            <h1 className="text-center font-bold text-2xl lg:pt-12 py-10 xl:text-4xl">Liste des commandes</h1>
            <div className="text-center">
                <NavLink to={`/commande/create`} className="w-full sm:w-auto bg-emerald-500 text-white font-bold py-2 px-4 text-center rounded hover:bg-emerald-600 transition duration-300">
                    Ajouter une commande
                </NavLink>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-6 mb-8">
                {commandes && commandes.length > 0 ? (
                    commandes.map((commande, index) => (
                        <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 mb-8" key={index}>
                            <div className="px-4 text-center">
                                <p className="font-bold text-lg xl:text-2xl">Commande #{commande.id}</p>
                            </div>
                            <div className="px-4 my-4">
                                <p className="text-base xl:text-xl"><span className="font-bold">Produits :</span></p>
                                <ul className="list-disc pl-8 text-base xl:text-xl">
                                    {commande.quantites && Object.keys(commande.quantites).length > 0 ? (
                                        Object.entries(commande.quantites).map((medicament, index) => (
                                            <li key={index}>
                                                <p> {medicament[1].Nom} {medicament[1].dosage}</p>
                                                <p>- Quantité : {medicament[1].quantite}</p>
                                                <p>- Prix unitaire : {medicament[1].prix} €</p>
                                            </li>
                                        ))
                                    ) : (
                                        <li>Aucun médicament trouvé pour cette commande.</li>
                                    )}
                                </ul>
                            </div>
                            <p className="text-base xl:text-xl"><span className="font-bold">Prix total :</span> {commande.prix_total ? commande.prix_total.toFixed(2) : 'Non calculé'} €</p>
                            <div className="flex justify-around my-4 xl:mt-10">
                                <button onClick={() => handleValidateCommande(commande.id)} className="bg-emerald-600 text-white px-4 py-4 rounded-md text-base xl:text-xl">Valider</button>
                                <button onClick={() => handleDeleteCommande(commande.id)} className="bg-red-600 text-white px-4 py-4 rounded-md text-base xl:text-xl">Supprimer</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg xl:text-2xl">Aucune commande disponible.</p>
                )}
            </div>
        </div>
    );
}

export default CommandeGet;
