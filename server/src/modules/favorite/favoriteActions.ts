import type { RequestHandler } from "express";
import favoriteRepository from "./favoriteRepository";

const read: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rows = await favoriteRepository.read(Number.parseInt(id));

    res.json(rows).send(200);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  const { userId, tokenId } = req.body;
  try {
    const result = await favoriteRepository.create(userId, tokenId);

    res.json(result).send(201);
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  const { userId, tokenId } = req.body;
  try {
    const result = await favoriteRepository.delete(userId, tokenId);

    res.json(result).send(204);
  } catch (error) {
    next(error);
  }
};

export default { read, add, destroy };
