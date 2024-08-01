import cheerio from "cheerio";
import { Property } from "../models/property";
import { httpClient } from "../utils/httpClient";

const BASE_URL = "https://www.santanderimoveis.com.br/";

export const scrapeSantander = async (): Promise<Property[]> => {
  const response = await httpClient.get(BASE_URL);
  const $ = cheerio.load(response.data);
  const properties: Property[] = [];

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
};
