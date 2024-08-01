import cheerio from "cheerio";
import { Property } from "../models/property";
import { httpClient } from "../utils/httpClient";

const BASE_URL = "https://www.pestanaleiloes.com.br/procurar-bens?tipoBem=462";

export const scrapePestanaleiloes = async (): Promise<Property[]> => {
  const response = await httpClient.get(BASE_URL);
  const $ = cheerio.load(response.data);
  const properties: Property[] = [];

  $(".card").each((index, element) => {
    const type = $(element).find(".card-title").text().trim();
    const auctioneerOrBank = "Pestana Leilões";
    const firstAuctionDate = $(element).find(".data-leilao-1").text().trim();
    const secondAuctionDate = $(element).find(".data-leilao-2").text().trim();
    const firstAuctionValue = $(element).find(".valor-leilao-1").text().trim();
    const secondAuctionValue = $(element).find(".valor-leilao-2").text().trim();
    const registration = $(element).find(".matricula").text().trim();
    const notice = $(element).find(".edital a").attr("href") || "";
    const photoUrl = $(element).find(".card-img-top").attr("src") || "";

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
};
