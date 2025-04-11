import { NavLink } from "react-router-dom"
import roleValidator from "../components/CookieValidator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
        const access = await roleValidator(2);
        console.log(access);

        if (!access) {
            navigate('/login');
            return;
        }

    };
    if (window.innerWidth >= 425) {
        navigate('/dashboard/med'); // Redirige vers une autre page pour les ordinateurs
      }
    checkAccess();
}, []);



    return (
        <div className="bg-orange-100 pb-10 block md:hidden">
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">Tableau de Bord</h1>

            <div className="grid grid-cols-1 gap-4 p-6 mb-8">
                <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 xl:mx-48 xl:py-10 mb-8">
                  <div className="grid grid-cols-1 xl:grid-cols-1 xl:px-10 space-y-10">
                    <NavLink to="/dashboard/med" className="bg-emerald-600 text-white font-semibold text-xl xl:text-2xl text-center py-6 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:bg-emerald-700 hover:scale-105 hover:shadow-lg">Gestion des médicaments</NavLink>
                    <NavLink to="/dashboard/commande" className="bg-emerald-600 text-white font-semibold text-xl xl:text-2xl text-center py-6 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:bg-emerald-700 hover:scale-105 hover:shadow-lg">Gestion des commandes</NavLink>
                    <NavLink to="/dashboard/user" className="bg-emerald-600 text-white font-semibold text-xl xl:text-2xl text-center py-6 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:bg-emerald-700 hover:scale-105 hover:shadow-lg">Gestion des utilisateurs</NavLink>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;