
import * as dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv && nodeEnv !== 'development') {
  dotenv.config({ path: `.env.${nodeEnv}` });
} else {
  dotenv.config(); // carga .env (por defecto o si está en desarrollo local)
}


export const AppSettings = {
  APP_NAME: process.env.APP_NAME,
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  BASE_URL_AUTH: process.env.BASE_URL_AUTH || "",
  Scheduling: process.env.SHEDULING || '* * * * *',
  Secconds: parseInt(process.env.SECONDS) || 1,
  HEADERS: {
    crossDomain: "true",
    Accept: "application/json",
    //Authorization: `Bearer ${localStorage.token}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
    "Content-Type": "application/json",
    "clientid": process.env.CLIENT_ID || "clinica",

  },
}

export interface IAppSettings {
  BASE_URL: string;
  Scheduling: string;
  Secconds: number;
}

