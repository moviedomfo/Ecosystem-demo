import container from "@common/Container";
import express from "express";
import TokenController from "@infra/controllers/token.controller";

export const tokenRouter = express.Router();

const controller: TokenController = container.resolve("tokenController") as TokenController;

tokenRouter.get("/RefreshToken", controller.RefreshToken);
tokenRouter.get("/RemoveRefreshToken", controller.RemoveRefreshToken);
