import Container from "@common/ContainerOk";
import PersonsPubController from "@infra/controllers/PersonsPub.controller";
import express from "express";
export const personRouter = express.Router();

const personsPubController: PersonsPubController = Container.resolve("personsPubController") as PersonsPubController;

personRouter.post("/provider", personsPubController.Create);
personRouter.get("/providers/:id", personsPubController.GetProviderById);
personRouter.get("/providers", personsPubController.GetAllProviders);
personRouter.post("/customer", personsPubController.Create);
personRouter.get("/customer/:id", personsPubController.GetCustomerById);
// personRouter.get("/customers/:name", personsPubController.GetAllCustomer);
personRouter.get("/customers/", personsPubController.GetAllCustomer);
