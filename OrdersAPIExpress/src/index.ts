import "reflect-metadata";
import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import {AppConstants} from "@common/commonConstants";
import morgan from "morgan";
import {notFoundHandler} from "./common/not-found.middleware";
import swaggerUi from "swagger-ui-express";
import {ordersRouter} from "@infra/router/orders.router";
import {errorHandler} from "@common/ErrorHandle/errorHandler";
import {securitySettingsRouter} from "@infra/router/securitySettings.router";

require("dotenv").config();

if (!process.env.APP_PORT) {
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
app.use(express.json());

//app.use(morgan('combined'));
//app.use(morgan('tiny'));
app.use(morgan("short"));
// /** Logging */
// itemsRouter.use(morgan('dev'));
// /** Logging */
// authRouter.use(morgan('dev'));

app.get("/", function (req, res) {
  //res.send('Wellcome to ADN mutiation detector' );
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

const PORT = process.env.APP_PORT || 5000;
const URL = `${process.env.APP_BASE_URL}:${PORT}`;

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.APP_CLIENT_NAME} listening on port ${PORT}`);
  console.log(` API url ${URL}`);
  console.log(` API doccumentation ${URL}/docs/`);
  console.log(`-------------------------------------------------------------------------------`);
});
