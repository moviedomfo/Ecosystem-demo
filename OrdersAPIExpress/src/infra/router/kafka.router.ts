// Utilizando ordersRouter si funcionan pero debo pasarle la instancia del servicio al controller
// lo  que le quita la gracia a la abstraccion del uso de IoC
import container from "@common/ContainerOk";
import KafkaController from "@infra/controllers/Kafka.controller";
import express from "express";

export const kafkaRouter = express.Router();

const ctrl: KafkaController = container.resolve(
  "kafkaController"
) as KafkaController;

kafkaRouter.get("/GetTopicInfo", ctrl.GetTopicInfo);
kafkaRouter.get("/getAllTopics", ctrl.GetAllTopics);
// kafkaRouter.get("/:id", ordersController.GetById);
// kafkaRouter.delete("/", ordersController.ClearAll);
