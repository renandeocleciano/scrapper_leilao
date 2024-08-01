import { scrapeCaixa } from "./scrappers/caixa";
import { scrapeMegaleiloes } from "./scrappers/megaleiloes";
import { scrapePestanaleiloes } from "./scrappers/pestanaleiloes";
import { scrapePortalzuk } from "./scrappers/portalzuk";
import { scrapeSantander } from "./scrappers/santander";

const runScrapers = async () => {
  const caixaProperties = await scrapeCaixa();
  console.log("Caixa Properties:", caixaProperties);

  const santanderProperties = await scrapeSantander();
  console.log("Santander Properties:", santanderProperties);

  const megaleiloesProperties = await scrapeMegaleiloes();
  console.log("Megaleiloes Properties:", megaleiloesProperties);

  const portalzukProperties = await scrapePortalzuk();
  console.log("Portal Zuk Properties:", portalzukProperties);

  const pestanaleiloesProperties = await scrapePestanaleiloes();
  console.log("Pestana Leiloes Properties:", pestanaleiloesProperties);
};

runScrapers();
