import type { Metadata } from "next";
import { LegalDocRoot, LegalDocSection } from "@/components/legal/legal-doc";
import { BRANDING } from "@/lib/branding";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    `${BRANDING.name} — données personnelles collectées via le site marché livraison Dakar & vos droits (accès, rectification, suppression).`,
};

export default function PrivacyPage() {
  return (
    <LegalDocRoot
      title="Politique de confidentialité"
      meta={`Dernière mise à jour indicatif : février 2026 • ${BRANDING.name} (« nous »)`}
    >
      <LegalDocSection title="Finalité">
        <p>
          Ce document décrit les traitements nécessaires pour exploiter une vitrine commerce en ligne fictive (« mock »)&nbsp;: prise en
          compte du panier, du compte client, du suivi simplifié des commandes et du support utilisateur dans le périmètre Dakar décrit dans
          l’application {BRANDING.name}.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Données collectées">
        <p>Lorsque vous passez une commande simulée ou créez un compte de démo, peuvent être enregistrés&nbsp;:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Identité et contact&nbsp;: nom, adresse électronique, téléphone ou adresse de livraison saisie.</li>
          <li>
            Transactions mock&nbsp;: contenu panier factice, créneaux de livraison choisis dans l&apos;application, événements de navigation
            non sensibles permettant d&apos;améliorer l&apos;ergonomie.
          </li>
          <li>
            Logs techniques minimaux nécessaires à la stabilité (horodatage, identifiant de session démo, erreurs anonymisées hors contenu personnel).
          </li>
        </ul>
      </LegalDocSection>

      <LegalDocSection title="Base légale & durée">
        <p>
          Les traitements correspondent à votre usage volontaire de la boutique en environnement projet / démo. Les données stockées localement dans le
          navigateur (sessions persistantes Zustand) peuvent être effacées en vidant les données du site ou via la fonction « déconnexion ».
          Aucune publicité comportementale n&apos;est activée hors accord explicite à ajouter le cas échéant lors de la mise en prod.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Vos droits">
        <p>
          Dans un déploiement réel sous responsabilité sénégalaise et internationale (RGPD le cas échéant), vous pourriez solliciter
          l&apos;accès, la rectification ou la suppression (« droit à l&apos;oubli ») ainsi que portabilité. Pour cet environnement projet,
          contactez votre équipe produit&nbsp;: bonjour@greenmarket.sn avec l&apos;objet « Confidentialité&nbsp;». Un délais de traitement peut
          s&apos;appliquer après industrialisation juridique.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Sous-traitants & transferts hors Sénégal">
        <p>
          Hébergement, messagerie et analytics devront être listés précisément en production&nbsp;: précisez Pays, garanties SCC ou autre mécanisme
          de transfert. L&apos;instance actuelle n&apos;embarque pas de pipeline analytique tiers obligatoire.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Contact">
        <p>
          Questions confidentialité&nbsp;: bonjour@greenmarket.sn — {BRANDING.name}, coordonnées juridiques à compléter dans les mentions
          légales.
        </p>
      </LegalDocSection>
    </LegalDocRoot>
  );
}
