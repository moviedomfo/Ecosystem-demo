//import {GET} from "awilix-express";
import container from "@common/DependencyInj/Container";
import AuthController from "@infra/controllers/auth.controller";
import express from "express";
import {CreateContainer} from "@common/DependencyInj/DIContainerFactory";
import checkTokenMeddeware from "@common/auth.middleware";

export const authRouter = express.Router();
console.log("--------------------- NODE_ENV = " + process.env.NODE_ENV + " --------------------------");
//const container = CreateContainer();
const authController: AuthController = container.resolve("authController") as AuthController;

authRouter.post("/authenticate", authController.Auth);
authRouter.get("/RefreshToken", authController.RefreshToken);
authRouter.get("/getUser", authController.GetUser);
authRouter.get("/getUserSec", checkTokenMeddeware, authController.GetUser);
