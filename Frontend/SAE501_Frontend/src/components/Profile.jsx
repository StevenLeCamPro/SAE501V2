import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../components/Api";
import { useNavigate, NavLink } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { message, addFlashMessage } = useFlashMessage();

  useEffect(() => {
    const userCookie = Cookies.get("pharminnov_login");
    if (userCookie) {
      const { user_id } = JSON.parse(userCookie);
      fetchUser(user_id);
    } else {
      navigate("/login");
    }
  }, []);

  const fetchUser = async (id) => {
    try {
      const result = await Api("user", "get", id, null);
      if (result && result.length > 0) {
        setUser(result[0]);
      } else {
        console.warn("No user data returned.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const logout = () => {
    Cookies.remove("pharminnov_login");
    console.log("User logged out");
    addFlashMessage("Vous allez être déconnecté, veuillez patienter.", "success");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/arriereplan.jpg')" }}
    >
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-green-600 text-center p-5 font-semibold shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
            {message}
          </div>
        </div>
      )}

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black opacity-65"></div>
        {user ? (
          <div className="relative mx-auto max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-2xl mt-36 mb-20 lg:mt-32 xl:mt-14 xl:mb-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-emerald-700">
              Profil de {user.firstName} {user.name}
            </h1>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center shadow-inner">
                <svg
                  className="w-10 h-10 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 16c-1.65 0-3 1.35-3 3h18c0-1.65-1.35-3-3-3H6z"
                  />
                </svg>
              </div>

              {/* Informations du profil */}
              <div className="w-full space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Email :</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Date de naissance :</span>
                  <span className="text-gray-600">
                    {new Date(user.birthDate.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Adresse :</span>
                  <span className="text-gray-600">{user.address}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Téléphone :</span>
                  <span className="text-gray-600">{user.phone}</span>
                </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Créé le :</span>
                    <span className="text-gray-600">
                      {new Date(user.createdAt.date).toLocaleDateString()}
                    </span>
                  </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
              <NavLink
                to={`/update?id=${user.id}`}
                className="w-full sm:w-auto bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg text-center hover:bg-emerald-600 transition-colors duration-300"
              >
                Modifier mon profil
              </NavLink>
              <button
                className="w-full sm:w-auto bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={logout}
              >
                Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <p className="relative text-center text-gray-500 bg-white rounded-lg p-10">
            Chargement du profil...
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
