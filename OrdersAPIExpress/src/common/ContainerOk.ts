import {createContainer, asClass, InjectionMode} from "awilix";
import OrdersController from "@infra/controllers/orders.controller";
import OrdersService from "@application/Orders.service";
import OrdersMongoRepository from "@infra/repos/OrderMongo.repo";
import KafkaEventBusRepository from "@infra/repos/EventBus.repo";
import {scopePerRequest} from "awilix-express";
import {Application} from "express";

//Container par ase urilizado por ordersRouter (caso en el que funciona)
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  ordersService: asClass(OrdersService).scoped(),
  ordersRepo: asClass(OrdersMongoRepository).scoped(),
  ordersController: asClass(OrdersController).scoped(),

  eventBusRepo: asClass(KafkaEventBusRepository).scoped(),
});

export const ordersRepo = container.resolve("ordersRepo");
export const ordersController = container.resolve("ordersController");
export const ordersService = container.resolve("ordersService");

export const eventBusRepo = container.resolve("eventBusRepo");
export default container;
