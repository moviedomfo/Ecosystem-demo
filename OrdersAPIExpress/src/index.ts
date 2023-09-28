import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import {AppConstants} from "@common/CommonConstants";
import morgan from "morgan";
import {notFoundHandler} from "./common/not-found.middleware";
import swaggerUi from "swagger-ui-express";
import {ordersRouter} from "@infra/router/orders.router";
import {errorHandler} from "@common/ErrorHandle/errorHandler";
import {securitySettingsRouter} from "@infra/router/securitySettings.router";
//import "reflect-metadata";
//import "module-alias/register";
import "dotenv/config";
const packageJson = require("./../package.json");
import "./infra/db/mongo/MondoDatabase";
require("dotenv").config();

if (!AppConstants.PORT) {
  process.exit(1);
}

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan("short"));
//app.use(morgan('combined'));
//app.use(morgan('tiny'));
// itemsRouter.use(morgan('dev'));

/**set middleware to serve static files */
app.use(express.static(__dirname + "/public"));

app.get("/health", (_req, res) => {
  const response = {
    version: packageJson.version,
    appName: AppConstants.APP_CLIENT_NAME,
  };
  res.send(response);
});

app.get("/", function (_req, res) {
  res.render("index");
});
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
//  app.use(scopePerRequest(container));
// De esta forma funcionaba pero debia usar un Router donde el controller no
// no llamaba a su constructor y por ende quedaban undefined los Servicios inyectados
app.use("/api/orders", ordersRouter);

app.use("/api/securitySettings", securitySettingsRouter);

//loadContainer(app);

//app.use(loadControllers("**/*.controller.ts", {cwd: __dirname}));
// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const URL = `${process.env.APP_BASE_URL}:${AppConstants.PORT}`;

/**
 * Server Activation
 */
app.listen(AppConstants.PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.APP_CLIENT_NAME} listening on port ${AppConstants.PORT}`);
  console.log(` API url ${URL}`);
  console.log(` API doccumentation ${URL}/docs/`);
  console.log(`-------------------------------------------------------------------------------`);
});
