import { verify } from 'jsonwebtoken';
import container from "@common/Container";
import express from "express";
import TokenController from "@infra/controllers/token.controller";

export const tokenRouter = express.Router();

const controller: TokenController = container.resolve("tokenController") as TokenController;

tokenRouter.get("/GetRefreshToken", controller.GetRefreshToken);
tokenRouter.get("/GetAllToken", controller.GetAllToken);
//tokenRouter.delete("/DelRefreshToken:tk", controller.DelRefreshToken);
tokenRouter.delete("/DelRefreshToken", controller.DelRefreshToken);
tokenRouter.get("/VerifyJWT", controller.VerifyJWT);
