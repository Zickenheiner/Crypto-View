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
    const { name, address, image, symbol } = req.body;

    const priceData = (await tokenRepository.getPriceOnCoinMarketCap(
      symbol,
    )) as {
      quote: {
        USD: {
          price: number;
          percent_change_24h: number;
        };
      };
    };

    const result = await tokenRepository.create({
      name: name,
      symbol: symbol,
      address: address,
      price: priceData.quote.USD.price,
      percent_price: priceData.quote.USD.percent_change_24h,
      image: image,
    });
    res.json(result).status(201);
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tokenRepository.delete(Number.parseInt(id));
    res.json(result).status(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, readByName, add, destroy };
