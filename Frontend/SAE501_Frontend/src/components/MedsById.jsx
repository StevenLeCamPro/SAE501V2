import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "./Api";

function MedsById() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [produits, setProduits] = useState([])

    const fetchProduits = async () => {
        try {
            const result = await Api("produit", "get", id, null);
            console.log(result)
            setProduits(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProduits();
    }, []);

    const produitStock = (stock) => {
        if (stock > 10) {
            return <p className="flex text-base xl:text-xl"><img src="stock.svg" alt="stock" className="h-6 xl:h-8" />{stock} en stock</p>;
        } else {
            return <p className="flex text-base font-bold xl:text-xl text-red-500"><img src="stock.svg" alt="stock" className="h-6 xl:h-8 text-red-500" />Indisponible</p>;
        }
    }

    return (
        <>
            {produits.map((produit, index) => {
                var imagePath = "http://127.0.0.1:8000" + produit.image
                return (
                    <div className="bg-orange-100 pb-10" key={index}>
                        <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">{produit.nom} ({produit.dosage})</h1>

                        <div className="grid grid-cols-1 gap-10 p-6 mb-8">
                            <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 xl:mx-48 xl:py-20 mb-8">
                                <div className="flex flex-col lg:flex-row lg:items-center">
                                    <div className="lg:w-1/2 lg:flex lg:flex-col lg:items-right lg:pr-6">
                                        <div className="text-center lg:text-left mb-4">
                                            <p className="font-bold text-lg xl:text-3xl">{produit.nom} ({produit.dosage})</p>
                                            
                                        </div>
                                        <div className="flex justify-center lg:justify-start">
                                            <img src={imagePath} alt={produit.image} className="w-full h-auto lg:w-5/6 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="mt-4 lg:mt-0 lg:w-1/2">
                                        <div className="flex justify-between items-center px-4 mt-4 lg:mt-0">
                                            <div>
                                                <p className="font-bold text-lg xl:text-3xl">{produit.prix} €/unité</p>
                                            </div>
                                            <div>
                                                    {produitStock(produit.stock)}
                                                
                                            </div>
                                        </div>
                                        <hr className="border-1 border-emerald-600 my-4" />
                                        <div className="text-justify my-4 mx-6 xl:mt-10">
                                            <p className="text-base xl:text-xl"> {produit.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default MedsById;