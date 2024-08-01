import cheerio from "cheerio";
import { Property } from "../models/property";
import { httpClient } from "../utils/httpClient";

const BASE_URL =
  "https://www.megaleiloes.com.br/imoveis?tov=igbr&valor_max=5000000&tipo%5B0%5D=1&tipo%5B1%5D=2";

export const scrapeMegaleiloes = async (): Promise<Property[]> => {
  const response = await httpClient.get(BASE_URL);
  const $ = cheerio.load(response.data);
  const properties: Property[] = [];

  $(".card").each((index, element) => {
    const type = $(element).find(".card-title").text().trim();
    const auctioneerOrBank = "Mega Leilões";
    const firstAuctionDate = $(element)
      .find(".auction-date")
      .first()
      .text()
      .trim();
    const secondAuctionDate = $(element)
      .find(".auction-date")
      .last()
      .text()
      .trim();
    const firstAuctionValue = $(element)
      .find(".auction-value")
      .first()
      .text()
      .trim();
    const secondAuctionValue = $(element)
      .find(".auction-value")
      .last()
      .text()
      .trim();
    const registration = $(element).find(".registration").text().trim();
    const notice = $(element).find(".notice a").attr("href") || "";
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
    console.log(properties);
  });

  return properties;
};
