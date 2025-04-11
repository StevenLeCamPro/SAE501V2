import { NavLink, useNavigate } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";


function GetMeds() {
    const [produits, setProduits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState("");

    const navigate = useNavigate();

    const fetchProduits = async () => {
        try {
            const result = await Api("produit", "get", null, null);
            setProduits(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const result = await Api("categorie", "get", null, null);
            setCategories(result);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        const checkAccess = async () => {
       

            fetchProduits();
            fetchCategories();
        };
        checkAccess();
    }, []);

    const handleCategorieChange = (event) => {
        setSelectedCategorie(event.target.value);
    };

    const produitStock = (stock) => {
        if (stock > 10) {
            return <p className="flex text-base xl:text-xl"><img src="stock.svg" alt="stock" className="h-6 xl:h-8" />{stock} en stock</p>;
        } else {
            return <p className="flex text-base font-bold xl:text-xl text-red-500"><img src="stock.svg" alt="stock" className="h-6 xl:h-8 text-red-500" />Indisponible</p>;
        }
    }

    const filteredProduits = selectedCategorie
        ? produits.filter(produit => produit.categorie == selectedCategorie)
        : produits;

    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">Liste des médicaments</h1>
            <div>
                <select value={selectedCategorie} onChange={handleCategorieChange} className="ml-4 p-2 border rounded">
                    <option value="">Toutes les catégories</option>
                    {categories.map((categorie, index) => (
                        <option key={index} value={categorie.id}>{categorie.nom}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-6 mb-8">
                {filteredProduits.map((produit, index) => {
                    console.log(produit)
                    var imagePath = "http://127.0.0.1:8000" + produit.image;
                    return (
                        <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 mb-8" key={index}>
                            <div className="flex justify-center">
                                <img src={imagePath} alt={produit.image} className="w-full h-auto xl:h-5/6 xl:w-5/6 rounded-lg" />
                            </div>
                            <div className="flex justify-between items-center xl:mb-4 px-4">
                                <div>
                                    <p className="font-bold text-lg xl:text-2xl">{produit.nom}</p>
                                    <p className="text-base xl:text-xl">{produit.dosage}</p>
                                </div>
                                <div>
                                    <p className="text-right font-bold text-lg xl:text-2xl">{produit.prix} €</p>
                                    {produitStock(produit.stock)}
                                </div>
                            </div>
                           
                            <div className="text-center my-4 xl:mt-10">
                                <button className="bg-emerald-600 text-white px-4 py-4 rounded-md text-base xl:text-2xl"><NavLink to={`/medsbyid?id=${produit.id}`}>Voir les détails</NavLink></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GetMeds;
