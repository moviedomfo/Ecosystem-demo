import checkTokenMeddeware from "@common/auth.middleware";
import Container from "@common/ContainerOk";
import ProductPubController from "@infra/controllers/ProductPub.controller";

import express from "express";

export const productRouter = express.Router();

const productPubController: ProductPubController = Container.resolve("productPubController") as ProductPubController;

productRouter.post("/", checkTokenMeddeware, productPubController.Create);
productRouter.get("/", checkTokenMeddeware, productPubController.GetAll);
productRouter.get("/:id", checkTokenMeddeware, productPubController.GetById);
