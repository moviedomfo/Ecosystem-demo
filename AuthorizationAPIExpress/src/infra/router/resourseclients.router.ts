import express from "express";
import {CreateContainer} from "@common/DependencyInj/DIContainerFactory";
import ResourseClientsController from "@infra/controllers/resourseClients.controller";
import container from "@common/DependencyInj/Container";
export const resourseclients = express.Router();
// const container = CreateContainer();

const controller: ResourseClientsController = container.resolve("resourseClientsController") as ResourseClientsController;

resourseclients.get("/getPK", controller.getPK);
resourseclients.get("/generatePK", controller.generatePK);
