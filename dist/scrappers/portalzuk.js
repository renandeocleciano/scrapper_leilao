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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapePortalzuk = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const httpClient_1 = require("../utils/httpClient");
const BASE_URL = "https://www.portalzuk.com.br/leilao-de-imoveis";
const scrapePortalzuk = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield httpClient_1.httpClient.get(BASE_URL);
    const $ = cheerio_1.default.load(response.data);
    const properties = [];
    // Implement scraping logic here
    $(".leilao-card").each((index, element) => {
        const type = $(element).find(".leilao-titulo").text().trim();
        const auctioneerOrBank = "Portal Zuk";
        const firstAuctionDate = $(element)
            .find(".leilao-data")
            .first()
            .text()
            .trim();
        const secondAuctionDate = $(element)
            .find(".leilao-data")
            .last()
            .text()
            .trim();
        const firstAuctionValue = $(element)
            .find(".leilao-valor")
            .first()
            .text()
            .trim();
        const secondAuctionValue = $(element)
            .find(".leilao-valor")
            .last()
            .text()
            .trim();
        const registration = $(element).find(".leilao-matricula").text().trim();
        const notice = $(element).find(".leilao-edital a").attr("href") || "";
        const photoUrl = $(element).find(".leilao-foto img").attr("src") || "";
        properties.push({
            type,
            auctioneerOrBank,
            firstAuctionDate,
            secondAuctionDate,
            firstAuctionValue,
            secondAuctionValue,
            registration,
            notice,
            photoUrl,
        });
    });
    return properties;
});
exports.scrapePortalzuk = scrapePortalzuk;
