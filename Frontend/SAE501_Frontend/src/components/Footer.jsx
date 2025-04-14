import { NavLink } from "react-router-dom"

function Footer() {
  return (
    <>
      <footer className="relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-extrabold mb-2">PharmInnov</h2>
            <p className="mb-4 text-lg">&copy; 2024 PharmInnov. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center space-x-6 mb-4">
              <NavLink to="/cgu" className="hover:text-gray-300 transition-colors">
                CGU
              </NavLink>
              <NavLink to="/cgv" className="hover:text-gray-300 transition-colors">
                CGV
              </NavLink>
              <NavLink to="/pdc" className="hover:text-gray-300 transition-colors">
                Politique de confidentialité
              </NavLink>
            </div>
            <p className="text-sm italic">
              Conçu avec passion et innovation par l'équipe PharmInnov. (Steven Le Cam, Nicolas Marly et Tom Prot)
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
