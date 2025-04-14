import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useCheckRole from "./ReadCookie";

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const roleAccess = useCheckRole(2);

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const navLinkClass = ({ isActive }) =>
        `relative px-2 py-2 font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg 
        ${isActive
            ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-emerald-400 after:animate-pulse"
            : "text-white hover:text-emerald-300 hover:scale-105 hover:rotate-[-1deg]"
        }`;

    const renderLinks = () => {
        const links = [];

        links.push(
            <NavLink to="/commande/liste" className={navLinkClass}>Mes Commandes</NavLink>,
            <NavLink to="/profil" className={navLinkClass}>Profil</NavLink>
        );

        if (roleAccess === 2) {
            links.splice(1, 0, <NavLink to="/dashboard/med" className={navLinkClass}>Dashboard</NavLink>);
        } else if (roleAccess !== 1) {
            return (
                <>
                    <NavLink to="/login" className={navLinkClass}>Se connecter</NavLink>
                    <NavLink to="/register" className={navLinkClass}>S'inscrire</NavLink>
                </>
            );
        }

        return links;
    };

    return (
        <>
            <header className="absolute mt-4 align-center w-5/6 left-1/2 transform -translate-x-1/2 rounded-full z-50 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <button onClick={() => navigate("/")} className="flex items-center space-x-2 group">
                        <img src="/logo_site.png" alt="Logo" className="h-10 transition-transform duration-300 group-hover:rotate-6" />
                    </button>

                    <nav className="hidden lg:flex items-center space-x-4">
                        <NavLink to="/" className={navLinkClass}>Accueil</NavLink>
                        <NavLink to="/medicaments" className={navLinkClass}>Médicaments</NavLink>
                        <NavLink to="/visite" className={navLinkClass}>Visite 3D</NavLink>
                        {renderLinks()}
                    </nav>

                    <button onClick={toggleMobileMenu} className="lg:hidden text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                
            </header>

            <div className={`lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                    <div className="absolute w-full *:mt-32 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 p-6 flex flex-col space-y-4 text-xl font-bold text-white tracking-wider z-40 rounded-b-lg shadow-lg">
                        <NavLink to="/" className="hover:text-emerald-300">Accueil</NavLink>
                        <NavLink to="/medicaments" className="hover:text-emerald-300">Médicaments</NavLink>
                        <NavLink to="/visite" className="hover:text-emerald-300">Visite 3D</NavLink>

                        {roleAccess === 2 && (
                            <>
                                <NavLink to="/commande/liste" className="hover:text-emerald-300">Mes Commandes</NavLink>
                                <NavLink to="/dashboard/med" className="hover:text-emerald-300">Dashboard</NavLink>
                                <NavLink to="/profil" className="hover:text-emerald-300">Profil</NavLink>
                            </>
                        )}

                        {roleAccess === 1 && (
                            <>
                                <NavLink to="/commande/liste" className="hover:text-emerald-300">Mes Commandes</NavLink>
                                <NavLink to="/profil" className="hover:text-emerald-300">Profil</NavLink>
                            </>
                        )}

                        {(roleAccess !== 1 && roleAccess !== 2) && (
                            <>
                                <NavLink to="/login" className="hover:text-emerald-300">Se connecter</NavLink>
                                <NavLink to="/register" className="hover:text-emerald-300">S'inscrire</NavLink>
                            </>
                        )}
                    </div>
                </div>
        </>
    );
}

export default Header;
