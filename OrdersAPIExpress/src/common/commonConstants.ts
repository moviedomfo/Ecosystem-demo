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
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "Pelsoft API Express",
  KAFKA_BROKERS: process.env.KAFKA_BROKERS.split(",") || [],
  BD_PWD: process.env.BD_SERVER_PWD,
  BD_USER: process.env.BD_SERVER_USER,
  BD_SERVER_URI: process.env.BD_SERVER_URI,
};
