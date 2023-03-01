import {personRouter} from "./infra/router/personPub.router";
import {AppConstants} from "@common/commonConstants";
import "module-alias/register";
import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {notFoundHandler} from "@common/not-found.middleware";
import {errorHandler} from "@common/http-exception";
import {loadControllers} from "awilix-express";
//import {loadContainer} from "@common/Container";
import swaggerUi from "swagger-ui-express";
import {logsMiddle} from "@common/log.middlewar";
import {productRouter} from "@infra/router/productPub.router";
require("dotenv").config();

if (!process.env.PORT) {
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

//app.use(scopePerRequest(Container));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/api/products/", logsMiddle);
//loadContainer(app);
//app.use(loadControllers("./infra/controllers/*.ts", {cwd: __dirname}));

app.use("/api/products/", productRouter);
app.use("/api/persons/", personRouter);

// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const URL = `${process.env.BASE_URL}:${PORT}`;

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.CLIENT_NAME} listening on port ${PORT}`);
  console.log(` API url ${URL}`);
  console.log(` API doccumentation ${URL}/docs/`);
  console.log(`-------------------------------------------------------------------------------`);
});
