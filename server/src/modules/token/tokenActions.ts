import type { RequestHandler } from "express";
import tokenRepository from "./tokenRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tokens = await tokenRepository.readAll();
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = await tokenRepository.read(Number.parseInt(id));
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const readByName: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params;
    const token = await tokenRepository.readByName(name);
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [data, price] = await Promise.all([
      tokenRepository.getDataOnCoinMarketCap(Number.parseInt(id)) as Promise<{
        name: string;
        logo: string;
      }>,
      tokenRepository.getPriceOnCoinMarketCap(Number.parseInt(id)) as Promise<{
        quote: { USD: { price: number; percent_change_24h: number } };
      }>,
    ]);

    const result = await tokenRepository.create({
      name: data.name,
      price: price.quote.USD.price,
      percent_price: price.quote.USD.percent_change_24h,
      image: data.logo,
    });
    res.json(result).status(201);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, readByName, add };
