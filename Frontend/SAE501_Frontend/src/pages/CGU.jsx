import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function CGU() {
    useEffect(() => {
        window.scrollTo({ top: 0});
    }, []);
    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 lg:text-4xl">Conditions Générales d'Utilisation</h1>

            <div className="bg-white rounded-md mx-6 p-4 lg:p-10 lg:mx-48">
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">1.Préambule</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les présentes Conditions Générales de Vente (CGV) régissent l'utilisation du site web PharmInnov.fr (ci-après désigné le "Site") édité et exploité par PharmInnov, société immatriculée à Meaux.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">2.Acceptation des CGU</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">En accédant et en utilisant le Site, l'utilisateur reconnaît avoir lu, compris et accepté sans réserve les présentes CGU. Si l'utilisateur n'accepte pas ces conditions, il est prié de ne pas accéder au Site ni de l'utiliser.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">3.Objet du site</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Le Site a pour objet de fournir des informations sur les services proposés par PharmInnov, notamment la consultation des médicaments pour en assurer la disponibilité, et la proposition d'un bon de commande pour récupérer et payer les médicaments en pharmacie.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">4.Propriété Intellectuelle</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Tous les éléments du Site, y compris mais sans s'y limiter, les textes, les graphiques, les logos, les images, les vidéos, les icônes, les sons, les logiciels, appartiennent exclusivement à PharmInnov ou à ses partenaires et sont protégés par les lois nationales et internationales sur la propriété intellectuelle. Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du Site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l'autorisation expresse de PharmInnov.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">5.Utilisation du Site</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">L'utilisateur s'engage à utiliser le Site de manière licite, conforme aux présentes CGU et à la législation en vigueur. Il s'engage notamment à ne pas perturber le fonctionnement du Site, à ne pas accéder de manière non autorisée aux systèmes informatiques de PharmInnov, et à ne pas diffuser de contenu illicite ou préjudiciable.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">6.Création d'un Compte</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Pour accéder à certains services proposés par le Site, l'utilisateur doit créer un compte personnel. Lors de la création de ce compte, l'utilisateur s'engage à fournir des informations exactes et à les mettre à jour en cas de modifications. L'utilisateur est seul responsable de la confidentialité de ses identifiants de connexion et de toutes les activités effectuées depuis son compte.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">7.Responsabilités</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">PharmInnov s'efforce de maintenir le Site accessible et fonctionnel, mais ne peut garantir l'absence d'interruptions ou d'erreurs. En aucun cas, PharmInnov ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utilisation du Site. L'utilisateur reconnaît utiliser le Site et les informations qu'il contient sous sa seule responsabilité.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">8.Protection des Données Personnelles</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">PharmInnov s'engage à protéger la vie privée des utilisateurs conformément à sa Politique de Confidentialité disponible sur le Site. L'utilisateur reconnaît avoir pris connaissance de cette politique et consent au traitement de ses données personnelles dans les conditions qui y sont décrites. Les données collectées sont utilisées pour fournir les services proposés par le Site, gérer les comptes utilisateurs et améliorer les services de PharmInnov.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">9.Sécurité</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">PharmInnov met en œuvre les mesures techniques et organisationnelles appropriées pour garantir la sécurité des données personnelles des utilisateurs contre tout accès, modification, divulgation ou destruction non autorisé. Cependant, PharmInnov ne peut garantir une sécurité absolue des données transmises sur Internet et ne saurait être tenue responsable en cas de défaillance du système de sécurité.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">10.Liens Hypertextes</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Le Site peut contenir des liens hypertextes vers des sites web de tiers. PharmInnov ne saurait être tenu responsable du contenu de ces sites web, ni des dommages résultant de leur utilisation.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">11.Modifications des CGU</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">PharmInnov se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le Site. Il est recommandé à l'utilisateur de consulter régulièrement les CGU pour rester informé des éventuelles modifications.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">12.Droit Applicable et Juridiction</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les présentes CGU sont régies par le droit français. En cas de litigerelatif à leur interprétation ou à leur exécution, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux compétents de Meaux seront seuls compétents pour régler le litige.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">13.Dispositions Diverses</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Si une ou plusieurs dispositions des présentes CGU sont tenues pour non valides ou déclarées telles en application d'une loi, d'un règlement ou à la suite d'une décision définitive d'une juridiction compétente, les autres dispositions garderont toute leur force et leur portée.</p>
                </section>
                <section>
                    <h2 className="mb-2 font-bold text-xl lg:text-3xl">14.Contact</h2>
                    <p className="px-4 text-justify font-nunito text-lg mb-2 lg:text-xl">Pour toute question concernant les présentes CGU, l'utilisateur peut contacter PharmInnov à l'adresse suivante : contact.pharminnov@gmail.com .</p>
                    <p className="px-4 text-justify font-nunito text-lg mb-2 lg:text-xl">   Les présentes CGU sont rédigées en français. En cas de contradiction entre les versions traduites et la version française, cette dernière prévaudra. </p>
                    <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">  Les présentes CGU entrent en vigueur à la date de leur publication sur le Site.</p>
                </section>
                <section>
                        <div className="text-center">
                            <p>Pour toute question concernant nos conditions générales d'utilisation, veuillez nous contacter à :</p>
                            <p><NavLink to="mailto:contact@pharminnov.fr" className="text-emerald-600">contact@pharminnov.fr</NavLink></p>
                            <p>17 Rue Jablinot, 77100 Meaux</p>
                        </div>
                    </section>
            </div>
        </div>
    )
}

export default CGU