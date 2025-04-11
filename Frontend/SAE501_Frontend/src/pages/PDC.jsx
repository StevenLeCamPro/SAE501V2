import { NavLink} from "react-router-dom";
import { useEffect } from "react";
function PDC() {
    useEffect(() => {
        window.scrollTo({ top: 0});
    }, []);
    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 lg:text-4xl">Politique de Confidentialité</h1>

            <div className="bg-white rounded-md mx-6 p-4 lg:p-10 lg:mx-48">
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">1.Introduction</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-6">Bienvenue sur le site de PharmInnov. Nous nous engageons à protéger et à respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web.</p>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-6">Adresse: 53 route Nationale, 76340 Foucarmont</p>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-6">Email: <NavLink to="mailto:contact@pharminnov.fr" className="text-emerald-600">contact@pharminnov.fr</NavLink></p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">2.Informations que nous collectons</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-6">Nous pouvons collecter et traiter les informations suivantes vous concernant :</p>
                    <ul className="list-disc ml-6 mb-6 text-3xl lg:text-base">
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Informations que vous nous fournissez directement, telles que votre nom, adresse email, adresse postale, numéro de téléphone et date de naissance.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Informations techniques, y compris l'adresse IP utilisée pour connecter votre ordinateur à Internet, vos informations de connexion, le type et la version de votre navigateur, les paramètres de fuseau horaire, les types et versions de plug-in de navigateur, le système d'exploitation et la plateforme.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Informations sur votre visite, y compris les localisateurs uniformes de ressources (URL) complets, le chemin de navigation vers, à travers et depuis notre site (y compris la date et l'heure), les produits que vous avez consultés ou recherchés, les temps de réponse des pages, les erreurs de téléchargement, la durée des visites sur certaines pages, les informations d'interaction avec les pages (telles que le défilement, les clics et les survols) et les méthodes utilisées pour naviguer hors de la page.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">3.Utilisation de vos Informations</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Nous utilisons les informations détenues à votre sujet de la manière suivante :</p>
                    <ul className="list-disc ml-6 mb-6 text-3xl lg:text-base">
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour vous fournir des informations sur les produits ou services que vous demandez.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour vous informer de tout changement apporté à notre service.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour nous assurer que le contenu de notre site est présenté de la manière la plus efficace pour vous et pour votre ordinateur.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour administrer notre site et pour des opérations internes, y compris le dépannage, l'analyse des données, les tests, la recherche, les statistiques et les enquêtes.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour améliorer notre site afin de garantir que le contenu est présenté de la manière la plus efficace pour vous et pour votre appareil.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour vous permettre de participer aux fonctionnalités interactives de notre service, lorsque vous choisissez de le faire.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour mesurer ou comprendre l'efficacité de la publicité que nous vous adressons, à vous et à d'autres, et pour vous proposer des publicités pertinentes.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Pour faire des suggestions et des recommandations à vous et aux autres utilisateurs de notre site sur des biens ou des services qui pourraient vous intéresser.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">4.Partage de vos Informations</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Nous pouvons partager vos informations personnelles avec des tiers sélectionnés, y compris :</p>
                    <ul className="list-disc ml-6 mb-6 text-3xl lg:text-base">
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Les partenaires commerciaux, les fournisseurs et les sous-traitants pour l'exécution de tout contrat que nous concluons avec eux ou avec vous.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Les annonceurs et les réseaux publicitaires qui nécessitent les données pour sélectionner et diffuser des publicités pertinentes pour vous et pour les autres. Nous ne divulguons pas d'informations sur des individus identifiables à nos annonceurs, mais nous leur fournissons des informations agrégées sur nos utilisateurs.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Les fournisseurs d'analyses et de moteurs de recherche qui nous aident à améliorer et à optimiser notre site.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">5.Protection de vos Informations</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Nous mettons en œuvre des mesures de sécurité pour protéger vos informations contre l'accès non autorisé, la divulgation, l'altération ou la destruction. Cependant, la transmission d'informations via Internet n'est pas complètement sécurisée et nous ne pouvons pas garantir la sécurité de vos données transmises à notre site; toute transmission est à vos propres risques.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">6.Vos Droits</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Vous avez le droit de :</p>
                    <ul className="list-disc ml-6 mb-6 text-3xl lg:text-base">
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Demander l'accès à vos données personnelles (communément appelé "demande d'accès de la personne concernée"). Cela vous permet de recevoir une copie des données personnelles que nous détenons à votre sujet et de vérifier que nous les traitons légalement.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Demander la correction des données personnelles que nous détenons à votre sujet. Cela vous permet de corriger toute donnée incomplète ou inexacte que nous détenons à votre sujet, bien que nous puissions avoir besoin de vérifier l'exactitude des nouvelles données que vous nous fournissez.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Demander la suppression de vos données personnelles. Cela vous permet de nous demander de supprimer ou de retirer des données personnelles lorsqu'il n'y a pas de bonne raison pour que nous continuions à les traiter. Vous avez également le droit de nous demander de supprimer ou de retirer vos données personnelles lorsque vous avez exercé votre droit de vous opposer au traitement (voir ci-dessous).</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Vous opposer au traitement de vos données personnelles lorsque nous nous reposons sur un intérêt légitime (ou ceux d'un tiers) et qu'il y a quelque chose dans votre situation particulière qui vous fait vouloir vous opposer au traitement pour ce motif, car vous estimez que cela affecte vos droits et libertés fondamentaux.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Demander la restriction du traitement de vos données personnelles. Cela vous permet de nous demander de suspendre le traitement de vos données personnelles dans les scénarios suivants : si vous souhaitez que nous établissions l'exactitude des données; lorsque notre utilisation des données est illégale mais que vous ne voulez pas que nous les supprimions; lorsque vous avez besoin que nous conservions les données même si nous n'en avons plus besoin car vous en avez besoin pour établir, exercer ou défendre des revendications légales; vous vous êtes opposé à notre utilisation de vos données mais nous devons vérifier si nous avons des motifs légitimes impérieux de les utiliser.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Demander le transfert de vos données personnelles à vous ou à un tiers. Nous vous fournirons, ou à un tiers que vous avez choisi, vos données personnelles dans un format structuré, couramment utilisé et lisible par machine.</li>
                        <li className="px-4 text-justify font-nunito text-lg lg:text-xl mb-6">Retirer votre consentement à tout moment lorsque nous nous reposons sur le consentement pour traiter vos données personnelles. Cependant, cela n'affectera pas la légalité de tout traitement effectué avant que vous ne retiriez votre consentement. Si vous retirez votre consentement, il se peut que nous ne puissions pas vous fournir certains produits ou services. Nous vous informerons si tel est le cas au moment où vous retirez votre consentement.</li>
                        </ul>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Si vous souhaitez exercer l'un des droits énoncés ci-dessus, veuillez nous contacter à l'adresse mail suivante : <NavLink to="mailto:contact@pharminnov.fr" className="text-emerald-600">contact@pharminnov.fr</NavLink>.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">7.Changements de Cette Politique de Confidentialité</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Nous nous réservons le droit de mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page. Nous vous conseillons de vérifier cette page périodiquement pour toute modification.</p>
                </section>
                <section>
                        <div className="text-center">
                            <p>Pour toute question concernant notre politique de confidentialité, veuillez nous contacter à :</p>
                            <p><NavLink to="mailto:contact@pharminnov.fr" className="text-emerald-600">contact@pharminnov.fr</NavLink></p>
                            <p>17 Rue Jablinot, 77100 Meaux</p>
                        </div>
                    </section>
            </div>
        </div>
    );
}

export default PDC