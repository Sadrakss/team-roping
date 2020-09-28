import { getRepository } from "typeorm";
import { Double } from "../providers/entity/Doubles";
import { FootCompetitor } from "../providers/entity/FootCompetitor";
import { RandomDouble } from "../providers/entity/RandomDoubles";

import { Request, Response } from "express";


export default{
    async random(request: Request, response: Response,) {
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
          console.log("podpasdas")
          return response.json("OK");
        } catch (error) {
          return response.json(error).sendStatus(404);
        }
      },
}
