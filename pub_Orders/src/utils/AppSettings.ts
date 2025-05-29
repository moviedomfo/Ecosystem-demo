import * as dotenv from 'dotenv';
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv && nodeEnv !== 'development') {
  dotenv.config({ path: `.env.${nodeEnv}` });
} else {
  dotenv.config(); // carga .env (por defecto o si está en desarrollo local)
}

console.log("NODE_ENV", process.env.NODE_ENV);
export const AppSettings = {
  APP_NAME: process.env.APP_NAME,
  BASE_COMERCE_URL: process.env.BASE_COMERCE_URL || 'http://localhost:3001',
  BASE_ORDERS_URL: process.env.BASE_ORDERS_URL || 'http://localhost:3000',
  BASE_URL_AUTH: process.env.BASE_URL_AUTH || '',
  Scheduling: process.env.SHEDULING || '* * * * *',
  SECONDS: parseInt(process.env.SECONDS) || 1,
  HEADERS: {
    crossDomain: 'true',
    Accept: 'application/json',
    //Authorization: `Bearer ${localStorage.token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, Content-Type, Authorization, X-Auth-Token',
    'Content-Type': 'application/json',
    "clientid": process.env.CLIENT_ID || "",

  },
};


