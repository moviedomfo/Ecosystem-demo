require("dotenv").config();
/**
 * Common constats
 */
export const AppConstants = {
  Verion: process.env.APP_VERSION as string,
  COMPANY: "Pelsoft",
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_NAME: process.env.CLIENT_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_Expires: process.env.JWT_Expires,
  JWT_ExpiresRefreshToken: process.env.JWT_ExpiresRefreshToken,
  JWT_issuer: process.env.JWT_issuer,
  REDIS_USER: process.env.REDIS_USER ,
  REDIS_HOST: process.env.REDIS_HOST,
  BD_PWD: process.env.BD_SERVER_PWD,
  BD_USER: process.env.BD_SERVER_USER,
  R_EXP_MORE_THAN_4CHAR_CONTINUOS: ` *\\b(?=[a-z\\d]*([a-z\\d])\\1{3}|\\d+\\b)[a-z\\d]+`,
};
