import { createContainer, asClass, InjectionMode } from "awilix";
import OrdersController from "@infra/controllers/Orders.controller";
import OrdersService from "@application/Orders.service";
import OrdersMongoRepository from "@infra/repos/OrderMongo.repo";
import KafkaEventBusRepository from "@infra/repos/EventBus.repo";
import SecuritySettingsController from "@infra/controllers/securitySettings.controller";
import KafkaController from "@infra/controllers/Kafka.controller";
import KafkaAdminRepository from "@infra/repos/KafkaAdmin.repo";

//Container
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  ordersService: asClass(OrdersService).scoped(),
  ordersRepo: asClass(OrdersMongoRepository).scoped(),
  ordersController: asClass(OrdersController).scoped(),
  eventBusRepo: asClass(KafkaEventBusRepository).scoped(),
  securitySettingsController: asClass(SecuritySettingsController).scoped(),
  kafkaRepo:asClass(KafkaAdminRepository).scoped(),
  kafkaController:asClass(KafkaController).scoped(),
});

export const ordersRepo = container.resolve("ordersRepo");
export const ordersController = container.resolve("ordersController");
export const kafkaRepo = container.resolve("kafkaRepo");
export const kafkaController = container.resolve("kafkaController");
export const ordersService = container.resolve("ordersService");

export const eventBusRepo = container.resolve("eventBusRepo");
export default container;
