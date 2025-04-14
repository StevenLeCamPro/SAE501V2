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
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl pt-32">Liste des médicaments</h1>
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
                        <div
                        key={index}
                        className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300"
                      >
                        {/* Image produit */}
                        <div className="relative h-48 md:h-64 xl:h-80">
                          <img
                            src={imagePath}
                            alt={produit.image}
                            className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Overlay décoratif */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
                        </div>
                        {/* Contenu de la card */}
                        <div className="p-4 md:p-6 xl:p-8">
                          <div className="flex justify-between items-center">
                            <div>
                              <h2 className="text-xl md:text-2xl font-bold text-gray-800">{produit.nom}</h2>
                              <p className="text-sm md:text-base text-gray-600">{produit.dosage}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl md:text-2xl font-bold text-emerald-600">{produit.prix} €</p>
                              {produitStock(produit.stock)}
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <NavLink
                              to={`/medsbyid?id=${produit.id}`}
                              className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold transform transition-all duration-300 hover:bg-emerald-700 hover:scale-105"
                            >
                              Voir les détails
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      
                    );
                })}
            </div>
        </div>
    );
}

export default GetMeds;
