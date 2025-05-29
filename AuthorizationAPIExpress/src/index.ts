//import "reflect-metadata";
import "dotenv/config";
import { AppConstants } from "@common/commonConstants";
import CreateServer from "@common/helpers/server";

require("dotenv").config();

if (!AppConstants.APP_PORT) {
  console.error("env --> PORT NOT FOUND");

  process.exit(1000);
}
const app = CreateServer();

const URL = `${process.env.APP_BASE_URL}:${AppConstants.APP_PORT}`;

/**
 * Server Activation
 */

const server = app.listen(AppConstants.APP_PORT, () => {
  console.log(`-------------------------------------------------------------------------------`);
  console.log(` ${AppConstants.CLIENT_NAME} listening on port ${AppConstants.APP_PORT}`);
  console.log(` API url ${URL}`);
  console.log(`-------------------------------------------------------------------------------`);
});

export { server, app };
