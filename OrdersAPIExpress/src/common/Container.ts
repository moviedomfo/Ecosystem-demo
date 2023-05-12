// import {createContainer, asClass, InjectionMode} from "awilix";
// import OrdersController from "@infra/controllers/orders.controller";
// import OrdersService from "@application/Orders.service";
// import OrdersMongoRepository from "@infra/repos/OrderMongo.repo";
// import KafkaEventBusRepository from "@infra/repos/EventBus.repo";
// import {scopePerRequest} from "awilix-express";
// import {Application} from "express";

// export const loadContainer = (app: Application) => {
//   const container = createContainer({
//     injectionMode: InjectionMode.CLASSIC,
//   });

//   container.register({
//     ordersService: asClass(OrdersService).scoped(),
//     ordersRepo: asClass(OrdersMongoRepository).scoped(),
//     ordersController: asClass(OrdersController).scoped(),
//     eventBusRepo: asClass(KafkaEventBusRepository).scoped(),
//   });
//   app.use(scopePerRequest(container));
// };

