import {GET} from "awilix-express";
import container from "@common/Container";
import AuthController from "@infra/controllers/auth.controller";
import express from "express";

export const authRouter = express.Router();

const authController: AuthController = container.resolve("authController") as AuthController;

authRouter.post("/authenticate", authController.Auth);
authRouter.get("/RefreshToken", authController.RefreshToken);
