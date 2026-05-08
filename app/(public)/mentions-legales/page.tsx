import type { Metadata } from "next";
import { LegalDocRoot, LegalDocSection } from "@/components/legal/legal-doc";
import { BRANDING } from "@/lib/branding";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `${BRANDING.name} — informations éditoriales et juridiques (projet commerce en ligne faux data).`,
};

export default function MentionsLegalesPage() {
  return (
    <LegalDocRoot title="Mentions légales" meta={`À finaliser avant mise en ligne publique définitive • ${BRANDING.name}`}>
      <LegalDocSection title="Éditeur du site (projet)">
        <p>
          Raison sociale à compléter pour la version ouverte aux consommateurs réels.&nbsp;: <strong className="text-foreground">{BRANDING.name}</strong>
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Forme juridique&nbsp;: préciser (SARL, SASU, SUARL, entrepreneur individuel&nbsp;…) et capital social.</li>
          <li>Siège social&nbsp;: exemple &laquo;&nbsp;Avenue à définir, Dakar&nbsp;&raquo;.</li>
          <li>Numéro d&apos;identification nationale / registre&nbsp;: lorsque attribués.</li>
          <li>Directeur ou co-directeurs de publication&nbsp;: préciser nominativement.</li>
        </ul>
      </LegalDocSection>

      <LegalDocSection title="Contact">
        <p>
          Assistance clients et partenariats (fictifs dans cet environnement de démo)&nbsp;: téléphone&nbsp;{' '}
          <span className="text-foreground">+221&nbsp;33&nbsp;000&nbsp;00&nbsp;00</span> —{' '}
          <span className="text-foreground">bonjour@greenmarket.sn</span>
        </p>
      </LegalDocSection>

      <LegalDocSection title="Hébergement">
        <p>
          Dans la version développement locale&nbsp;: pas d&apos;hébergeur public. Une fois déployée, indiquez l&apos;hébergeur, adresse complète du
          data centre géographiquement pertinent et numéros de téléphone / courriel du support tiers.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Propriété intellectuelle">
        <p>
          L&apos;identité graphique&nbsp;: logo {BRANDING.name}, textes créés pour cette maquette ainsi que gabarits d&apos;interface restent réservés
          jusqu&apos;à ce qu&apos;un statut soit défini avec les parties prenantes. Les données catalogue mock ne constituent pas une offre marchande contraignante avant industrialisation métier réelle.
        </p>
      </LegalDocSection>

      <LegalDocSection title="Limitation">
        <p>
          Ces mentions servent uniquement au cadre légal projet / démo. Elles sont fournies à titre informatif et doivent être validées et complétées
          par vos conseils avant ouverture commerciale.
        </p>
      </LegalDocSection>
    </LegalDocRoot>
  );
}
