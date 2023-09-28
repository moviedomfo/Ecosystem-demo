import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {notFoundHandler} from "@common/not-found.middleware";
import {ExpressErrorHandler} from "./common/ErrorHandle/ExpressErrorHandler";
import swaggerUi from "swagger-ui-express";
import {logsMiddle} from "@common/log.middlewar";
import {productRouter} from "@infra/router/productPub.router";
import {securitySettingsRouter} from "@infra/router/securitySettings.router";
import {personRouter} from "./infra/router/personPub.router";
import {AppConstants} from "@common/CommonConstants";
import "module-alias/register";
import "dotenv/config";
import "./infra/db/mongo/MondoDatabase";
const packageJson = require("./../package.json");

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

// app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
//   return res.send(swaggerUi.generateHTML(await import("./../../swagger.json")));
// });

app.use("/api/persons/", logsMiddle);
//loadContainer(app);
//app.use(loadControllers("./infra/controllers/*.ts", {cwd: __dirname}));

app.use("/api/products/", productRouter);
app.use("/api/persons/", personRouter);
app.use("/api/securitySettings", securitySettingsRouter);
// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(ExpressErrorHandler);

const URL = `${process.env.APP_BASE_URL}:${AppConstants.PORT}`;

/**
 * Server Activation
 */
app.listen(AppConstants.PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.APP_CLIENT_NAME} V${packageJson.version}  listening on port ${AppConstants.PORT}`);
  console.log(` API url ${URL}`);
  console.log(` API doccumentation ${URL}/docs/`);
  console.log(`-------------------------------------------------------------------------------`);
});
