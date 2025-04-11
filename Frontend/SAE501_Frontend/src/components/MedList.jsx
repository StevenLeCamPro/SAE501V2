import { NavLink, useNavigate } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";
import { useFlashMessage } from "../context/FlashMessageContext";

import useCheckRole from "./ReadCookie";

function MedList() {
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();
  const { message, addFlashMessage } = useFlashMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const openModal = (id) => {
    setIsModalOpen(true);
    setSelectedUserId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchProduits = async () => {
    try {
      const result = await Api("produit", "get", null, null);
      setProduits(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduit = async (id) => {
    try {
      // Appelle l'API pour supprimer le produit
      await Api("produit", "delete", id, null);

      // Met à jour l'état local pour exclure le produit supprimé
      setProduits((prevProduits) =>
        prevProduits.filter((produit) => produit.id !== id)
      );
      addFlashMessage("Médicament supprimé avec succès", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      addFlashMessage("Erreur lors de la suppression du médicament", "error");
    }
  };

  useEffect(() => {
    const role = useCheckRole(2);
    if (role === 0) {
      navigate("/login");
    } else if (role === 1) {
      navigate("/");
    }
    fetchProduits();

    console.log(produits);
  }, []);

  return (
    <div className="bg-orange-100 pb-10">
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-green-600 text-center p-5 font-semibold shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
            {message}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-900 bg-opacity-40 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/3 border border-green-300 transform scale-100 transition-all duration-300 ease-out">
            <h2 className="text-2xl text-green-700 font-bold text-center">
              Confirmation de suppression
            </h2>
            <p className="text-gray-700 text-center mt-3 leading-relaxed">
              Voulez-vous vraiment supprimer ce médicament ?
              <br />
              <span className="text-red-500 underline font-bold">
                Cette action est irréversible.
              </span>
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-green-700 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteProduit(selectedUserId)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pb-6 overflow-scroll xl:overflow-hidden px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Nom
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Dosage
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Description
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Stock
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Prix Unitaire
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Catégorie
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id} className="text-sm leading-normal">
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.nom}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.dosage}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.description}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.stock}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.prix} €
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.categorieName}
                </td>
                <td className="xl:text-lg text-nunito border-y border-gray-300">
                  <div className="flex justify-around items-center">
                    <NavLink to={`/medsbyid?id=${produit.id}`} className="mx-2">
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 1280 662"
                        preserveAspectRatio="xMidYMid meet"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <g
                          transform="translate(0,662) scale(0.1,-0.1)"
                          fill="#000000"
                          stroke="none"
                        >
                          <path d="M6330 6610 c-1399 -91 -2792 -594 -4189 -1515 -694 -457 -1415 -1050 -1957 -1609 l-183 -189 100 -108 c140 -151 583 -569 839 -794 1446 -1267 2965 -2053 4445 -2299 423 -70 660 -90 1105 -90 383 -1 517 7 845 49 1006 129 1985 482 2960 1068 876 526 1767 1287 2429 2075 l78 93 -19 22 c-11 12 -75 87 -144 167 -1111 1299 -2373 2239 -3644 2718 -576 216 -1111 340 -1725 398 -195 18 -747 26 -940 14z m421 -580 c562 -56 1096 -275 1534 -627 306 -246 561 -564 734 -916 91 -184 137 -304 187 -486 136 -496 123 -1033 -37 -1521 -81 -246 -179 -448 -324 -665 -109 -163 -193 -264 -349 -420 -232 -232 -450 -387 -751 -535 -280 -138 -550 -222 -875 -271 -196 -30 -580 -33 -775 -5 -680 94 -1246 378 -1705 852 -422 437 -671 963 -746 1574 -20 166 -15 517 11 680 159 1029 879 1869 1890 2205 218 72 403 111 655 138 80 9 455 6 551 -3z" />
                        </g>
                      </svg>
                    </NavLink>
                    <NavLink
                      to={`/dashboard/updateMed?id=${produit.id}`}
                      className="mx-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </NavLink>
                    <button
                      onClick={() => openModal(produit.id)}
                      className="mx-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 26 26"
                        className="h-5 w-5"
                      >
                        <path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedList;
