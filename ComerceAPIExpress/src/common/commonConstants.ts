require('dotenv').config();

/**
 * Common constats
 */
export const AppConstants = {
  Verion: process.env.APP_VERSION as string,
  COMPANY: 'Pelsoft',
  CLIENT_ID: process.env.CLIENT_ID ,
  CLIENT_NAME: process.env.CLIENT_NAME ,
  Brokers: process.env.KAFKA_BROKERS.split(',') || [],
  BD_HOST: process.env.BD_HOST,
  BD_INSTANCE: process.env.BD_INSTANCE,
  BD_DATABASE_NAME: process.env.BD_DATABASE_NAME,
  BD_PWD: process.env.BD_PWD,
  BD_USER: process.env.BD_USER,
  DB_PORT : process.env.BD_PORT,
  R_EXP_MORE_THAN_4CHAR_CONTINUOS: ` *\\b(?=[a-z\\d]*([a-z\\d])\\1{3}|\\d+\\b)[a-z\\d]+`,
};
