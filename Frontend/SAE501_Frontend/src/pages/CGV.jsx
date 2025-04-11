import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function CGV() {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);
    return (
        <>
            <div className="bg-orange-100 pb-10">
                <h1 className="text-center font-bold text-2xl py-10 lg:text-4xl">Conditions Générales de Vente</h1>

                <div className="bg-white rounded-md mx-6 p-4 lg:p-10 lg:mx-48">
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">1.Introduction</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les présentes conditions générales de vente (CGV) ont pour objet de définir les modalités et conditions dans lesquelles la société PharmInnov (ci-après "Vendeur") fournit ses produits à ses clients (ci-après "Client"). En passant commande, le Client accepte sans réserve les présentes CGV.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">2.Informations sur le Vendeur</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-6">Le site web www.pharminnov.fr est édité par :</p>
                        <ul className="list-disc ml-6 mb-6 text-3xl lg:text-base">
                            <li className="px-4 text-justify font-nunito text-lg lg:text-xl">PharmInnov.</li>
                            <li className="px-4 text-justify font-nunito text-lg lg:text-xl">Société immatriculée à Meaux.</li>
                            <li className="px-4 text-justify font-nunito text-lg lg:text-xl">Email : contact@pharminnov.fr</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">3.Médicments</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les médicaments proposés sur le Site sont ceux qui figurent sur le site au jour de la consultation par le Client. Chaque médicament est accompagné d'un descriptif établi par le Vendeur.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">4.Prix</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison. Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation du bon de commande par le Client en pharmacie physique.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">5.Commande</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Le Client passe commande sur le site Internet www.pharminnov.fr. Pour que la commande soit validée, le Client devra accepter, en cliquant à l’endroit indiqué, les présentes CGV. Il recevra par la suite un bon de commande pour pouvoir récupérer et payer ses médicaments dans une pharmacie partenaire.</p>
                         <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Toute commande vaut acceptation des prix et descriptions des produits disponibles à la vente. Le Vendeur accusera réception de la commande dès sa validation par l’envoi d’un email.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">6.Paiement</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Aucun paiement ne sera effectué sur le site en lui-même, toute transaction bancaire se fera dans un lieu physique d'une pharmacie partenaire de PharmInnov.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">7.Droit de Rétractation</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Conformément aux dispositions légales en vigueur, le Client dispose d’un délai de 14 jours à compter de la réception de ses produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité. Le Client devra notifier sa décision de se rétracter en envoyant un email à contact@pharminnov.fr.</p>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les produits devront être retournés dans leur état d'origine et complets permettant leur recommercialisation à l'état neuf, et accompagnés de la facture d'achat.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">8.Garanties et Responsabilités</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Le Vendeur est tenu des défauts de conformité des produits dans les conditions prévues par la loi. Le Client peut présenter toute réclamation en contactant le Vendeur par email à contact@pharminnov.fr.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">9.Propriété Intellectuelle</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Tous les éléments du Site sont et restent la propriété intellectuelle et exclusive du Vendeur. Nul n’est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du Site qu’ils soient logiciels, visuels ou sonores.</p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">10.Données Personnelles</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Le Vendeur se réserve le droit de collecter les informations nominatives et les données personnelles concernant le Client. Elles sont nécessaires à la gestion de la commande, ainsi qu’à l’amélioration des services et des informations adressées au Client.</p>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l’exécution des services et commandes pour leur gestion, exécution, traitement et paiement. Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.</p>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Pour plus d'informations, veuillez consulter notre <NavLink to="/pdc" className="text-emerald-600">Politique de Confidentialité.</NavLink></p>
                    </section>
                    <section>
                        <h2 className="mb-2 font-bold text-xl lg:text-3xl">11.Règlement des Litiges</h2>
                        <p className="px-4 text-justify font-nunito text-lg mb-6 lg:text-xl lg:mb-12">Les présentes CGV sont régies par le droit français. En cas de litigerelatif à leur interprétation ou à leur exécution, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux compétents de Meaux seront seuls compétents pour régler le litige.</p>
                    </section>
                    <section>
                        <div className="text-center">
                            <p>Pour toute question concernant nos conditions générales de vente, veuillez nous contacter à :</p>
                            <p><NavLink to="mailto:contact@pharminnov.fr" className="text-emerald-600">contact@pharminnov.fr</NavLink></p>
                            <p>17 Rue Jablinot, 77100 Meaux</p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default CGV