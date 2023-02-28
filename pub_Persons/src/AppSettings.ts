
import * as dotenv from "dotenv";

dotenv.config();

export  const AppSettings   = {
   APP_NAME : process.env.APP_NAME,
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    Scheduling: process.env.SHEDULING || '* * * * *',
    Secconds: parseInt (process.env.SECONDS) || 1,
    HEADERS : {
      crossDomain: "true",
      Accept: "application/json",
      //Authorization: `Bearer ${localStorage.token}`,
      "Access-Control-Allow-Origin" :"*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
      "Content-Type": "application/json",
    },
  }

export interface  IAppSettings  {
  BASE_URL:string;
  Scheduling:string;
  Secconds:number;
}
  
  