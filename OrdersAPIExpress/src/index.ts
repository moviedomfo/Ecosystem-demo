import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { AppConstants } from "@common/CommonConstants";
import { notFoundHandler } from "@common/not-found.middleware";
import swaggerUi from "swagger-ui-express";
import { ordersRouter } from "@infra/router/orders.router";
import { errorHandler } from "@common/ErrorHandle/errorHandler";
import { securitySettingsRouter } from "@infra/router/securitySettings.router";
import { kafkaRouter } from "@infra/router/kafka.router";
import "dotenv/config";
import "./infra/db/mongo/MongoDatabase";
const packageJson = require("./../package.json");


require("dotenv").config();

if (!AppConstants.APP_PORT) {
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("short"));

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

const swaggerRouter = express.Router();

// swaggerRouter.use(swaggerUi.serve as express.RequestHandler);
// swaggerRouter.get(
//   '/',
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   }) as express.RequestHandler
// );

app.use('/docs', swaggerRouter);


//  app.use(scopePerRequest(container));
// De esta forma funcionaba pero debia usar un Router donde el controller no
// no llamaba a su constructor y por ende quedaban undefined los Servicios inyectados
app.use("/api/orders", ordersRouter);
app.use("/api/kafka", kafkaRouter);
app.use("/api/securitySettings", securitySettingsRouter);

//loadContainer(app);

//app.use(loadControllers("**/*.controller.ts", {cwd: __dirname}));
// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const URL = `${process.env.APP_BASE_URL}:${AppConstants.APP_PORT}`;

/**
 * Server Activation
 */
app.listen(AppConstants.APP_PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.APP_CLIENT_NAME} listening on port ${AppConstants.APP_PORT}`);
  console.log(` API url ${URL}`);
  console.log(` API doccumentation ${URL}/docs/`);
  console.log(`-------------------------------------------------------------------------------`);
});
