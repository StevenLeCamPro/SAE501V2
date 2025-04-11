import { NavLink } from "react-router-dom"

function Footer() {

    return(
        <>
        <div className="bg-emerald-600 bottom-0 w-full">
            <footer className="text-white text-center py-4">
                <p>&copy; 2024 PharmInnov. Tous droits réservés.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <NavLink to="/cgu" className="text-white">CGU</NavLink>
                    <NavLink to="/cgv" className="text-white">CGV</NavLink>
                    <NavLink to="/pdc" className="text-white">Politique de confidentialité</NavLink>
                </div>
            </footer>
        </div>
        </>
    )

}

export default Footer