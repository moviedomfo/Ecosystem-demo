require("dotenv").config();

/**
 * Common constats
 */
export const AppConstants = {
  COMPANY: "Pelsoft",
  APP_VERSION: process.env.APP_VERSION,
  APP_CLIENT_ID: process.env.APP_CLIENT_ID,
  APP_CLIENT_NAME: process.env.APP_CLIENT_NAME,
  APP_FILES_PATH: process.env.APP_FILES_PATH,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  KAFKA_BROKERS: process.env.KAFKA_BROKERS.split(",") || [],
  BD_HOST: process.env.BD_HOST,
  BD_INSTANCE: process.env.BD_INSTANCE,
  BD_DATABASE_NAME: process.env.BD_DATABASE_NAME,
  BD_PWD: process.env.BD_PWD,
  BD_USER: process.env.BD_USER,
  DB_PORT: process.env.BD_PORT,
};
