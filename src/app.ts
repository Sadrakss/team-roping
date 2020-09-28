import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { router } from "./routes";

const app = express();
createConnection();
app.use(express.json());
app.use(router);

export { app };
