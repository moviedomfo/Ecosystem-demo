import "reflect-metadata";
import "dotenv/config";
import {AppConstants} from "./common/commonConstants";
import CreateServer from "@common/helpers/server";

require("dotenv").config();

if (!process.env.PORT) {
  process.exit(1);
}
const app = CreateServer();

const PORT = process.env.PORT || 5000;
const URL = `${process.env.BASE_URL}:${PORT}`;

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
