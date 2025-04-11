import Cookies from 'js-cookie';

function Accueil() {

    const ordonnanceBanner = () => {
        if (Cookies.get('pharminnov_login')) {
            return (
                <div className="bg-emerald-600 flex flex-col md:flex-row items-center justify-center h-[50vh]">
                    <div className="md:w-1/2 px-6 lg:px-32 text-white">
                        <p className="text-justify text-sm md:text-base lg:text-lg font-medium mt-4">
                            En cliquant sur ce bouton, vous pouvez rentrer une ordonnance, et notre site se charge du reste !
                        </p>
                        <p className="text-justify text-sm md:text-base lg:text-lg font-medium mt-8">
                            Plus besoin de chercher vos médicaments, notre site s’en occupe, vous avez juste besoin de cliquer sur le bouton à côté, de rentrer vos informations et de donner votre ordonnance.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
                        <a href="/commande/create">
                            <button className="w-full rounded-md bg-white px-8 py-4 text-emerald-600 hover:bg-emerald-700 hover:text-white transition-colors duration-300 whitespace-nowrap text-center">
                                Scanner mon ordonnance
                            </button>
                        </a>
                    </div>
                </div>
            );
        }
        return;
    }

    return (
        <>
            <div className="bg-orange-100 pb-10 flex flex-col">
                <div className="bg-cover bg-center h-70 lg:py-52 relative" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
                    <h1 className="relative text-4xl text-white py-24 px-16 text-center md:text-5xl lg:text-6xl lg:py-32 lg:px-32">Bienvenue sur PharmInnov</h1>
                </div>
                {ordonnanceBanner()}
                <h2 className="underline decoration-solid text-center font-bold text-xl md:text-2xl lg:text-3xl mt-14">C'est quoi PharmInnov ?</h2>
                <p className="text-justify px-4 text-sm md:text-base lg:text-lg lg:px-48 font-medium mt-10 mb-14">
                    Dans un monde où l'accès aux médicaments est indispensable pour la santé de chacun,
                    l’évolution vers des solutions numériques se dessine de plus en plus.
                    Pharminnov est une réponse à ce besoin : une pharmacie en ligne qui propose du
                    « click and collect » permettant aux patients un gain de temps précieux ainsi qu’une
                    obtention de leur traitement simplement et efficacement. Avec Pharminnov, les patients
                    peuvent importer leur ordonnance sur le site et, une fois cette dernière vérifiée par
                    le médecin inscrit en bas de page, ils reçoivent un bon de commande contenant tous leurs
                    médicaments, ainsi qu’une notification si un ou plusieurs médicaments sont manquants.
                    Cela permet d’avoir une visibilité sur la disponibilité des produits en pharmacie,
                    sans avoir à se déplacer.
                </p>
            </div>
        </>
    )

}

export default Accueil

