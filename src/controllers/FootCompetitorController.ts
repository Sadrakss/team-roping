import { getRepository } from "typeorm";
import { FootCompetitor } from "../providers/entity/FootCompetitor";
import { Request, Response } from "express";

export const listFootCompetitors = async (
  request: Request,
  response: Response
) => {
  const _FootCompetitors = await getRepository(FootCompetitor).find();
  return response.json(_FootCompetitors);
};

export const createFootCompetitors = async (
  request: Request,
  response: Response
) => {
  const { name, footRendCap } = request.body;
  try {
    await getRepository(FootCompetitor).save({
      name,
      footRendCap,
    });
    return response.send();
  } catch (error) {
    return response.status(404).json(error);
  }
};

export const updateFootCompetitors = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  try {
    const _FootCompetitor = await getRepository(FootCompetitor).update(
      id,
      request.body
    );

    if (_FootCompetitor.affected === 1) {
      return response.status(200).send();
    }
  } catch (error) {
    return response.status(404).json(error);
  }
};

export const removeFootCompetitors = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  try {
    await getRepository(FootCompetitor).delete(id);
    return response.status(200).send();
  } catch (error) {
    return response.status(400).json(error);
  }
};
