import {GET} from "awilix-express";
// import container from "@common/DependencyInj/Container";
import AuthController from "@infra/controllers/auth.controller";
import express from "express";
import {CreateContainer} from "@common/DependencyInj/DIContainerFactory";

export const authRouter = express.Router();
const container = CreateContainer();
const authController: AuthController = container.resolve("authController") as AuthController;

authRouter.post("/authenticate", authController.Auth);
authRouter.get("/RefreshToken", authController.RefreshToken);

authRouter.get("/getuser", authController.GetUser);
