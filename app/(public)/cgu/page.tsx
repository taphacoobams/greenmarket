import type { Metadata } from "next";
import { LegalDocRoot, LegalDocSection } from "@/components/legal/legal-doc";
import { BRANDING } from "@/lib/branding";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: `${BRANDING.name} — cadre général CGU projet vitrine épicerie en ligne faux data Dakar.`,
};

export default function CguPage() {
  return (
    <LegalDocRoot
      title="Conditions générales d'utilisation (CGU)"
      meta={`Projet fictif — conditions indicatives jusqu'à validation métier juridique • ${BRANDING.name}`}
    >
      <LegalDocSection title="Objet">
        <p>
          Les présentes Conditions Générales d&apos;Utilisation («&nbsp;CGU&nbsp;») encadrent l&apos;accès au site&nbsp;/ application présentée dans le périmètre
          développement {BRANDING.name}. Elles n&apos;imposent pas d&apos;obligations contractuelles fermes hors passage en prod validé.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Compte utilisateur">
        <p>
          Une inscription permet de conserver votre panier simulé, votre profil décoratif ainsi que vos préférences. Vous garantissez exactitude minimale pour
          contacter lors d&apos;un déploiement réel. Nous nous réservons la suspension&nbsp;/ suppression de compte en cas d&apos;usage abusif (bot, fraude lorsque
          outils paiement vivants).
        </p>
      </LegalDocSection>

      <LegalDocSection title="Service & périmètre">
        <p>
          Catalogue, stocks et paiements représentés ici constituent une illusion fonctionnelle. La zone géographique cible illustrative est Dakar. La règle
          affichée de commandes avant minuit pour livraison lendemain est commerciale type — à préciser officiellement (créneaux, exceptions, fermetures locales).
        </p>
      </LegalDocSection>

      <LegalDocSection title="Prix">
        <p>
          Les montants FCFA visibles reposent sur un jeu Données. Toute divergence entre mock et prix réels devra faire l&apos;objet d&apos;une mention claire ainsi
          qu&apos;d&apos;un module fiscal adapté après industrialisation logicielle&nbsp;/ comptable.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Limitation responsabilité (projet)">
        <p>
          Dans l&apos;instance actuelle, aucune garantie de disponibilité, de précision financière exhaustive ni livraison effective n&apos;est contractée avec un
          consommateur final. Une assurance responsabilité civile ainsi que politique recours seraient à envisager après lancement officiel livré.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Propriété & contenus">
        <p>
          Contribution utilisateur hors bug report reste inexistante hors phase beta future. Scraping automatique contre la maquette projet pourrait être
          interdit par politique infra — à préciser après hébergement final.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Modifications CGU">
        <p>
          Version archivée en dépôt code. Modifications futures communiquées par bandeau application ou courriel transactionnel une fois opérationnel.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Contact">
        <p>
          Questions relatives aux CGU&nbsp;: bonjour@greenmarket.sn — référence «&nbsp;CGU {BRANDING.name}&nbsp;».
        </p>
      </LegalDocSection>
    </LegalDocRoot>
  );
}
