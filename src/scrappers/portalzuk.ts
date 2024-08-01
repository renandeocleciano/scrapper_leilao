import cheerio from "cheerio";
import { Property } from "../models/property";
import { httpClient } from "../utils/httpClient";

const BASE_URL = "https://www.portalzuk.com.br/leilao-de-imoveis";

export const scrapePortalzuk = async (): Promise<Property[]> => {
  const response = await httpClient.get(BASE_URL);
  const $ = cheerio.load(response.data);
  const properties: Property[] = [];

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
};
