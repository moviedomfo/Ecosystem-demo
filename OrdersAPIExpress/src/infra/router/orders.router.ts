// Utilizando ordersRouter si funcionan pero debo pasarle la instancia del servicio al controller
// lo  que le quita la gracia a la abstraccion del uso de IoC
import container from "@common/ContainerOk";
import OrdersController from "@infra/controllers/Orders.controller";
import express from "express";

export const ordersRouter = express.Router();

const ordersController: OrdersController = container.resolve(
  "ordersController"
) as OrdersController;

ordersRouter.post("/", ordersController.OrderCreate);
ordersRouter.get("/", ordersController.GetAll);
ordersRouter.get("/getByParams/", ordersController.GetByParams);
ordersRouter.get("/:id", ordersController.GetById);
ordersRouter.delete("/", ordersController.ClearAll);
