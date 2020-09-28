import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

import { FootCompetitor } from "../providers/entity/FootCompetitor";
import { HeadCompetitor } from "../providers/entity/HeadCompetitor";
import { Double } from "../providers/entity/Doubles";

export default {
  async create(request: Request, response: Response, next:NextFunction) {
    try {
      let FDoubles = await getRepository(Double).findOne();
      if (FDoubles) {
        await getRepository(Double).clear();
      }

      let _CountHeadCompetitors = await getRepository(HeadCompetitor).count();
      let _CountFootCompetitors = await getRepository(FootCompetitor).count();

      let NameHeadCompetitors = await getRepository(HeadCompetitor)
        .createQueryBuilder("nameHeadCompetitor")
        .select(["nameHeadCompetitor.name", "nameHeadCompetitor.headRendCap"])
        .getMany();

      let NameFootCompetitors = await getRepository(FootCompetitor)
        .createQueryBuilder("nameFootCompetitor")
        .select(["nameFootCompetitor.name", "nameFootCompetitor.footRendCap"])
        .getMany();

      let averageRendcap: number = 5.5;
      for (let x = 0; x < _CountHeadCompetitors; x++) {
        for (let y = 0; y < _CountFootCompetitors; y++) {
          if (
            NameHeadCompetitors[x].name != NameFootCompetitors[y].name &&
            NameHeadCompetitors[x].headRendCap +
              NameFootCompetitors[y].footRendCap <=
              averageRendcap
          ) {
            let data = `${NameHeadCompetitors[x].name} - ${NameFootCompetitors[y].name}`;
            await getRepository(Double).insert({
              double: `${data}`,
            });
          }
        }
      }
      // Arrumar o next
    next();
    } catch (error) {
      return response.json(error).sendStatus(404);
    }
  },
};
