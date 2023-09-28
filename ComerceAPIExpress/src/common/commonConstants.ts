import {get} from "env-var";
import "dotenv/config";

/**
 * Common constats
 */
export const AppConstants = {
  COMPANY: "Pelsoft",
  PORT: get("PORT").default("5000").asPortNumber(),
  APP_VERSION: get("APP_VERSION").required().asString(),
  APP_CLIENT_ID: get("APP_CLIENT_ID").required().asString(),
  APP_CLIENT_NAME: get("APP_CLIENT_NAME").required().asString(),
  APP_FILES_PATH: process.env.APP_FILES_PATH,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  KAFKA_BROKERS: process.env.KAFKA_BROKERS.split(",") || [],
  BD_HOST: get("BD_HOST").required().asString(),
  BD_INSTANCE: get("BD_INSTANCE").required().asString(),
  BD_DATABASE_NAME: get("BD_DATABASE_NAME").required().asString(),
  BD_PWD: get("BD_PWD").required().asString(),
  BD_USER: get("BD_USER").required().asString(),
  DB_PORT: get("BD_PORT").required().asString(),
  BD_MONGO_URI: get("BD_MONGO_URI").asString(),
  BD_MONGO_PWD: get("BD_MONGO_PWD").asString(),
  BD_MONGO_USER: get("BD_MONGO_USER").asString(),
  BD_MONGO_DB_NAME: get("BD_MONGO_DB_NAME").asString(),
};
