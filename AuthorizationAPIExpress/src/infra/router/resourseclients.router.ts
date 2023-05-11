import express from "express";
import {CreateContainer} from "@common/DependencyInj/DIContainerFactory";
import ResourseClientsController from "@infra/controllers/resourseClients.controller";

export const resourseclients = express.Router();
const container = CreateContainer();

const controller: ResourseClientsController = container.resolve("resourseClientsController") as ResourseClientsController;

resourseclients.get("/getPK", controller.getPK);
resourseclients.get("/generatePK", controller.generatePK);
