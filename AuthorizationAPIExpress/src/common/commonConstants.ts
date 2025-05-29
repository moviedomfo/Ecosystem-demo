require("dotenv").config();
/**
 * Common constats
 */
export const AppConstants = {
  APP_PORT: process.env.APP_PORT as string || "5000",
  Verion: process.env.APP_VERSION as string,
  COMPANY: "Pelsoft",
  CLIENT_NAME: process.env.APP_CLIENT_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_Expires: process.env.JWT_Expires,
  JWT_ExpiresRefreshToken: process.env.JWT_ExpiresRefreshToken,
  JWT_issuer: process.env.JWT_ISSUER,
  REDIS_USER: process.env.REDIS_USER,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_EXPIRES_TIME: process.env.REDIS_EXPIRES_TIME || 60,
  BD_PWD: process.env.BD_SERVER_PWD,
  BD_USER: process.env.BD_SERVER_USER
};
