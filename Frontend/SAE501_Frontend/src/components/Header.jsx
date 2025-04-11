import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useCheckRole from "./ReadCookie";

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinkClass = ({ isActive }) =>
        `p-2 rounded-md transition-all duration-200 ${
            isActive
                ? "bg-white text-emerald-600 font-bold" 
                : "bg-emerald-500 text-white hover:bg-white hover:text-emerald-600"
        }`;

    const loginNav = () => {
        const roleAccess = useCheckRole(2);
        if (roleAccess === 2) {
            return (
                <>
                    <NavLink to="/commande/liste" className={navLinkClass}>Mes Commandes</NavLink>
                    <NavLink to="/dashboard/med" className={navLinkClass}>Tableau de bord</NavLink>
                    <NavLink to="/profil" className={navLinkClass}>Profil</NavLink>
                </>
            );
        } else if (roleAccess === 1) {
            return (
                <>
                    <NavLink to="/commande/liste" className={navLinkClass}>Mes Commandes</NavLink>
                    <NavLink to="/profil" className={navLinkClass}>Profil</NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink to="/login" className={navLinkClass}>Se connecter</NavLink>
                    <NavLink to="/register" className={navLinkClass}>S'inscrire</NavLink>
                </>
            );
        }
    };

    const LoginNavMobile = () => {
        const roleAccess = useCheckRole(2);
        if (roleAccess === 2) {
            return (
                <>
                    <NavLink to="/commande/liste" className="block text-white bg-emerald-800 px-4 py-2 rounded">Mes Commandes</NavLink>
                    <NavLink to="/dashboard/med" className="block text-white bg-emerald-800 px-4 py-2 rounded">Tableau de bord</NavLink>
                    <NavLink to="/profil" className="block text-white bg-emerald-800 px-4 py-2 rounded">Profil</NavLink>
                </>
            );
        } else if (roleAccess === 1) {
            return (
                <>
                    <NavLink to="/commande/liste" className="block text-white bg-emerald-800 px-4 py-2 rounded">Mes Commandes</NavLink>
                    <NavLink to="/profil" className="block text-white bg-emerald-800 px-4 py-2 rounded">Profil</NavLink>
                </>
            );
        } else {  
            return (
                <>
                    <NavLink to="/login" className="block text-white bg-emerald-800 px-4 py-2 rounded">Se connecter</NavLink>
                    <NavLink to="/register" className="block text-white bg-emerald-800 px-4 py-2 rounded">S'inscrire</NavLink>
                </>
            );
        }

    }

    return (
        <>
            {/* Navbar pour les ordis */}
            <div className="hidden lg:flex bg-emerald-600 justify-between items-center p-4">
                <div className="flex items-center">
                    <button onClick={() => navigate("/")}>
                        <img src="/logo_site.png" alt="Logo" className="h-12 mr-2" />
                    </button>
                </div>
                <div className="flex space-x-4">
                    <NavLink to="/" className={navLinkClass}>Accueil</NavLink>
                    <NavLink to="/medicaments" className={navLinkClass}>Médicaments</NavLink>
                    <NavLink to="/visite" className={navLinkClass}>Visite Virtuelle</NavLink>
                    {loginNav()}
                </div>
            </div>

            {/* Logo pour le menu burger */}
            <div className="lg:hidden bg-emerald-600 p-4">
                <div className="flex justify-between items-center">
                    <button onClick={() => navigate("/")}>
                        <img src="/logo_site.png" alt="Logo" className="h-8" />
                    </button>
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Navbar pour téléphone */}
                {isMobileMenuOpen && (
                    <div className="mt-2 space-y-2">
                        <NavLink to="/" className="block text-white bg-emerald-800 px-4 py-2 rounded">Accueil</NavLink>
                        <NavLink to="/medicaments" className="block text-white bg-emerald-800 px-4 py-2 rounded">Médicaments</NavLink>
                        <NavLink to="/visite" className="block text-white bg-emerald-800 px-4 py-2 rounded">Visite Virtuelle</NavLink>
                        {LoginNavMobile()}
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;
