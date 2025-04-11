import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="bg-emerald-600 p-4 shadow-lg border-t-2 border-emerald-700 hidden md:block">
            <h1 className="text-white text-2xl font-bold text-center mb-4">Tableau de Bord</h1>
            <ul className="flex justify-center space-x-8">
                <li>
                    <NavLink
                        to="/dashboard/med"
                        className={({ isActive }) =>
                            `text-lg font-semibold transition duration-300 ease-in-out px-2 pb-1 border-b-2 ${
                                isActive ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
                            }`
                        }
                    >
                        Médicaments
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/commande"
                        className={({ isActive}) =>
                        `text-lg font-semibold transition duration-300 ease-in-out px-2 pb-1 border-b-2 ${
                            isActive ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
                        }`
                        }
                    >
                        Commandes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/user"
                        className={({ isActive }) =>
                            `text-lg font-semibold transition duration-300 ease-in-out px-2 pb-1 border-b-2 ${
                                isActive ? 'border-white text-white' : 'border-transparent text-gray-300 hover:text-white'
                            }`
                        }
                    >
                        Utilisateurs
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
