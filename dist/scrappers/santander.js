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
exports.scrapeSantander = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const httpClient_1 = require("../utils/httpClient");
const BASE_URL = "https://www.santanderimoveis.com.br/";
const scrapeSantander = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield httpClient_1.httpClient.get(BASE_URL);
    const $ = cheerio_1.default.load(response.data);
    const properties = [];
    // Implement scraping logic here
    // Example:
    $(".property-item").each((index, element) => {
        const type = $(element).find(".property-type").text().trim();
        const auctioneerOrBank = "Santander";
        const firstAuctionDate = $(element)
            .find(".first-auction-date")
            .text()
            .trim();
        const secondAuctionDate = $(element)
            .find(".second-auction-date")
            .text()
            .trim();
        const firstAuctionValue = $(element)
            .find(".first-auction-value")
            .text()
            .trim();
        const secondAuctionValue = $(element)
            .find(".second-auction-value")
            .text()
            .trim();
        const registration = $(element).find(".registration").text().trim();
        const notice = $(element).find(".notice a").attr("href") || "";
        const photoUrl = $(element).find(".property-photo img").attr("src") || "";
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
exports.scrapeSantander = scrapeSantander;
