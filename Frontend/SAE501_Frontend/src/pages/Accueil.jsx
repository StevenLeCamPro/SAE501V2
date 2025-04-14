import Cookies from 'js-cookie';

function Accueil() {

    const ordonnanceBanner = () => {
        if (Cookies.get('pharminnov_login')) {
            return (
                <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 backdrop-blur-sm bg-opacity-60 flex flex-col md:flex-row items-center justify-center p-8 md:p-16 rounded-3xl mx-4 md:mx-16 -translate-y-10 shadow-2xl">
                    <div className="md:w-1/2 px-6 lg:px-16 text-white">
                        <p className="text-justify text-sm md:text-base lg:text-lg font-medium mt-4">
                            En cliquant sur ce bouton, vous pouvez rentrer une ordonnance, et notre site se charge du reste !
                        </p>
                        <p className="text-justify text-sm md:text-base lg:text-lg font-medium mt-8">
                            Plus besoin de chercher vos médicaments, notre site s’en occupe, vous avez juste besoin de cliquer sur le bouton à côté, de rentrer vos informations et de donner votre ordonnance.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
                        <a href="/commande/create">
                            <button className="w-full rounded-full bg-white px-8 py-4 text-emerald-600 font-bold tracking-wider shadow-lg transform hover:scale-105 hover:rotate-1 transition-transform duration-300 whitespace-nowrap text-center">
                                Scanner mon ordonnance
                            </button>
                        </a>
                    </div>
                </div>
            );
        }
        return null;
    }

    return (
        <>
            <div className="flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 pb-10">
                <div 
                    className="relative h-[70vh] lg:py-24  bg-cover bg-center"
                    style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
                    <h1 className="relative text-4xl md:text-5xl lg:text-6xl py-40 px-8 lg:py-32 lg:px-32 text-center font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
                        Bienvenue sur PharmInnov
                    </h1>
                </div>
                {ordonnanceBanner()}
                <h2 className="underline decoration-solid text-center font-bold text-2xl md:text-3xl lg:text-4xl mt-14 tracking-wider">
                    C'est quoi PharmInnov ?
                </h2>
                <p className="text-justify px-4 md:px-8 lg:px-48 text-sm md:text-base lg:text-lg font-medium mt-10 mb-14 leading-relaxed tracking-tight">
                    Dans un monde où l'accès aux médicaments est indispensable pour la santé de chacun, l’évolution vers des solutions numériques se dessine de plus en plus. PharmInnov est une réponse à ce besoin : une pharmacie en ligne qui propose du « click and collect » permettant aux patients un gain de temps précieux ainsi qu’une obtention de leur traitement simplement et efficacement. Avec PharmInnov, les patients peuvent importer leur ordonnance sur le site et, une fois cette dernière vérifiée par le médecin inscrit en bas de page, ils reçoivent un bon de commande contenant tous leurs médicaments, ainsi qu’une notification si un ou plusieurs médicaments sont manquants. Cela permet d’avoir une visibilité sur la disponibilité des produits en pharmacie, sans avoir à se déplacer.
                </p>
            </div>
        </>
    )
}

export default Accueil;
