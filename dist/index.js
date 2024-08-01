"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const megaleiloes_1 = require("./scrappers/megaleiloes");
const pestanaleiloes_1 = require("./scrappers/pestanaleiloes");
const portalzuk_1 = require("./scrappers/portalzuk");
const runScrapers = () => __awaiter(void 0, void 0, void 0, function* () {
    //   const caixaProperties = await scrapeCaixa();
    //   console.log("Caixa Properties:", caixaProperties);
    //   const santanderProperties = await scrapeSantander();
    //   console.log("Santander Properties:", santanderProperties);
    const megaleiloesProperties = yield (0, megaleiloes_1.scrapeMegaleiloes)();
    console.log("Megaleiloes Properties:", megaleiloesProperties);
    const portalzukProperties = yield (0, portalzuk_1.scrapePortalzuk)();
    console.log("Portal Zuk Properties:", portalzukProperties);
    const pestanaleiloesProperties = yield (0, pestanaleiloes_1.scrapePestanaleiloes)();
    console.log("Pestana Leiloes Properties:", pestanaleiloesProperties);
});
runScrapers();
