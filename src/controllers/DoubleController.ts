import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { FootCompetitor } from "../providers/entity/FootCompetitor";
import { HeadCompetitor } from "../providers/entity/HeadCompetitor";
import { Double } from "../providers/entity/Doubles";
import { RandomDouble } from "../providers/entity/RandomDoubles";

export default {

  async create(request: Request, response: Response, next) {
    try{
      await getRepository(Double).clear();

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
    next();
    // return response.send()
    }catch(error){
    return  response.json(error).sendStatus(404)
    }
  },

  async random(request: Request, response: Response, next) {
    try {
      await getRepository(RandomDouble).clear();

      let __doubles = await getRepository(Double)
        .createQueryBuilder("doubles")
        .select(["doubles.double"])
        .getMany();

      let position = 0;
      let aux = 0;
      let count = 0;

      let end = await getRepository(Double).count();
      let jump = await getRepository(FootCompetitor).count();

      while (position != -1) {
        // console.log(
        //   `Position:${position} \n aux:${aux} \n count:${count} \n end:${end}`
        // );
        await getRepository(RandomDouble).insert({
          double: `${__doubles[position].double}`,
        });
        count++;
        position += jump;

        if (position > end) {
          if (count == end) {
            position = -1;
          } else {
            aux++;
            position = aux;
          }
        }

        if (position == end) {
          await getRepository(RandomDouble).insert({
            double: `${__doubles[position].double}`,
          });
          count++;
          aux++;
          position = aux;
          if (count == end) {
            position = -1;
          }
        }
      }
      return response.send();
    } catch (error) {
      return response.json(error).sendStatus(404);
    }
  },
};
