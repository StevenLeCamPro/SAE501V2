import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "./Api";

function MedsById() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [produits, setProduits] = useState([]);

  const fetchProduits = async () => {
    try {
      const result = await Api("produit", "get", id, null);
      console.log(result);
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
      return (
        <p className="flex items-center text-base md:text-lg text-emerald-600">
          <img src="stock.svg" alt="stock" className="h-6 md:h-8 mr-1" />
          {stock} en stock
        </p>
      );
    } else {
      return (
        <p className="flex items-center text-base md:text-lg font-bold text-red-500">
          <img src="stock.svg" alt="stock" className="h-6 md:h-8 mr-1" />
          Indisponible
        </p>
      );
    }
  };

  return (
    <>
      {produits.map((produit, index) => {
        const imagePath = "http://127.0.0.1:8000" + produit.image;
        return (
          <div
            className="min-h-screen bg-orange-100 flex flex-col items-center justify-center p-6"
            key={index}
          >
            <div className="mt-20 md:mt-12 xl:mt-32 group relative rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300 max-w-4xl w-full ">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src={imagePath}
                    alt={produit.image}
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">
                      {produit.nom} ({produit.dosage})
                    </h1>
                    <p className="text-lg md:text-xl font-semibold text-emerald-600 mb-4">
                      {produit.prix} € / unité
                    </p>
                    {produitStock(produit.stock)}
                  </div>
                  <hr className="my-4 border-gray-300" />
                  <div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {produit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MedsById;
