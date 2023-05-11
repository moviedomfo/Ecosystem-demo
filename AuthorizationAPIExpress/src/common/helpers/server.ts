import "reflect-metadata";
import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {ExpressErrorHandler} from "@common/ErrorHandle/ExpressErrorHandler";
import {authRouter} from "@infra/router/auth.router";
import {tokenRouter} from "@infra/router/token.router";
import { resourseclients } from "@infra/router/resourseclients.router";

function CreateServer() {
  const app = express();

  /**
   *  App Configuration
   */
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(morgan("short"));

  app.use(express.static("public"));

  //  app.use(scopePerRequest(container));
  // De esta forma funcionaba pero debia usar un Router donde el controller no
  // no llamaba a su constructor y por ende quedaban undefined los Servicios inyectados
  app.use("/api/sec/", authRouter);
  app.use("/api/tk/", tokenRouter);
  app.use("/api/resourseclients/", resourseclients);
  //loadContainer(app);

  //app.use(loadControllers("**/*.controller.ts", {cwd: __dirname}));
  // Attach the first Error handling Middleware
  app.use(ExpressErrorHandler);

  return app;
}

export default CreateServer;
