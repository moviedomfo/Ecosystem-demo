// Utilizando ordersRouter si funcionan pero debo pasarle la instancia del servicio al controller
// lo  que le quita la gracia a la abstraccion del uso de IoC
import container from "@common/ContainerOk";
import SecuritySettingsController from "@infra/controllers/securitySettings.controller";
import express from "express";

export const securitySettingsRouter = express.Router();

const securitySettingsController: SecuritySettingsController = container.resolve(
  "securitySettingsController"
) as SecuritySettingsController;

securitySettingsRouter.post("/", securitySettingsController.Create);

