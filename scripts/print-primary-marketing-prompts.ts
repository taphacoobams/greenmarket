import { primaryMarketingAssetsOrdered } from "../lib/marketing-asset-image-prompts";

console.log(`
=== GREEN MARKET — 4 visuels prioritaires (ordre recommandé) ===
`);

let i = 1;
for (const row of primaryMarketingAssetsOrdered()) {
  console.log(`${i}. ${row.key}`);
  console.log(`   fichier → ${row.fichier}`);
  console.log(`   FR :\n${row.promptFr}\n`);
  console.log(`   EN :\n${row.promptEn}`);
  console.log("---");
  i++;
}
