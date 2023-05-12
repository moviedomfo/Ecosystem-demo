//import "reflect-metadata";
import "dotenv/config";
import {AppConstants} from "./common/commonConstants";
import CreateServer from "@common/helpers/server";

require("dotenv").config();

if (!process.env.APP_PORT) {
  console.error("env --> APP_PORT NOT FAOUND");

  process.exit(1000);
}
const app = CreateServer();

const PORT = process.env.APP_PORT;
const URL = `${process.env.APP_BASE_URL}:${PORT}`;

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.CLIENT_NAME} listening on port ${PORT}`);
  console.log(` API url ${URL}`);
  console.log(`-------------------------------------------------------------------------------`);
});

export {server, app};
