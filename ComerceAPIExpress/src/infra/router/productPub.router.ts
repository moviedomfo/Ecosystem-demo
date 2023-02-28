import Container from "@common/ContainerOk";
import ProductPubController from "@infra/controllers/ProductPub.controller";

import express from "express";

export const productRouter = express.Router();

const productPubController: ProductPubController = Container.resolve("productPubController") as ProductPubController;

productRouter.post("/", productPubController.Create);
productRouter.get("/", productPubController.GetAll);
productRouter.get("/:id", productPubController.GetById);
