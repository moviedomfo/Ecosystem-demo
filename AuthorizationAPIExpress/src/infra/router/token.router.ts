//import container from "@common/DependencyInj/Container";
import express from "express";
import TokenController from "@infra/controllers/token.controller";
import { CreateContainer } from "@common/DependencyInj/DIContainerFactory";
export const tokenRouter = express.Router();
const container = CreateContainer();

const controller: TokenController = container.resolve("tokenController") as TokenController;

tokenRouter.get("/GetRefreshToken", controller.GetRefreshToken);
tokenRouter.get("/GetAllToken", controller.GetAllToken);
//tokenRouter.delete("/DelRefreshToken:tk", controller.DelRefreshToken);
tokenRouter.delete("/DelRefreshToken", controller.DelRefreshToken);
tokenRouter.get("/VerifyJWT", controller.VerifyJWT);

tokenRouter.get("/getByKey", controller.GetByKey);
tokenRouter.get("/GetByUserId", controller.GetByUserId);