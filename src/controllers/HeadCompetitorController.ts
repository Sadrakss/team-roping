import { getRepository } from "typeorm";
import { HeadCompetitor } from "../providers/entity/HeadCompetitor";
import { Request, Response } from "express";

export const listHeadCompetitors = async (
  request: Request,
  response: Response
) => {
  const _HeadCompetitors = await getRepository(HeadCompetitor).find();
  return response.json(_HeadCompetitors);
};

export const createHeadCompetitors = async (
  request: Request,
  response: Response
) => {
  const { name, headRendCap } = request.body;
  try {
    await getRepository(HeadCompetitor).save({
      name,
      headRendCap,
    });
    return response.send();
  } catch (error) {
    return response.sendStatus(404).json(error);
  }
};

export const updateHeadCompetitors = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;

    const _HeadCompetitors = await getRepository(HeadCompetitor).update(
      id,
      request.body
    );

    if (_HeadCompetitors.affected === 1) {
      return response.status(200).send();
    }
  } catch (error) {
    return response.status(404).json(error);
  }
};

export const removeHeadCompetitors = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;

    const _HeadCompetitors = await getRepository(HeadCompetitor).delete(id);

    if (_HeadCompetitors.affected === 1) {
      return response.status(200).send();
    }
  } catch (error) {
    return response.status(400).json(error);
  }
};
