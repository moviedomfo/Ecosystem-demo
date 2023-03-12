require("dotenv").config();
/**
 * Common constats
 */
export const AppConstants = {
  Verion: process.env.APP_VERSION as string,
  COMPANY: "Pelsoft",
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_NAME: process.env.CLIENT_NAME,
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "Pelsoft API Express",
  KAFKA_BROKERS: process.env.KAFKA_BROKERS.split(",") || [],
  BD_PWD: process.env.BD_SERVER_PWD,
  BD_USER: process.env.BD_SERVER_USER,
  R_EXP_MORE_THAN_4CHAR_CONTINUOS: ` *\\b(?=[a-z\\d]*([a-z\\d])\\1{3}|\\d+\\b)[a-z\\d]+`,
};
