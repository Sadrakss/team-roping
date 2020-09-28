import { Router } from "express";
import {
  listHeadCompetitors,
  createHeadCompetitors,
  updateHeadCompetitors,
  removeHeadCompetitors,
} from "./controllers/HeadCompetitorController";
import {
  listFootCompetitors,
  createFootCompetitors,
  updateFootCompetitors,
  removeFootCompetitors
} from "./controllers/FootCompetitorController"


// import {create,randomDouble} from "./controllers/DoubleController"
import DoubleController from "./controllers/DoubleController"


const router = Router();

router.get("/", (request, response) => {
  return response.json({Message: 'Hello World!'});
});

router.get("/head-competitors", listHeadCompetitors);
router.post("/head-competitors", createHeadCompetitors);
router.put("/head-competitors/:id", updateHeadCompetitors);
router.delete("/head-competitors/:id",removeHeadCompetitors)

router.get("/foot-competitors", listFootCompetitors);
router.post("/foot-competitors", createFootCompetitors);
router.put("/foot-competitors/:id", updateFootCompetitors);
router.delete("/foot-competitors/:id", removeFootCompetitors);

router.post("/double",DoubleController.create,DoubleController.random)




export { router };
