import * as dotenv from 'dotenv';

dotenv.config();

export const AppConstants = {
  APP_NAME: process.env.APP_NAME,
  // BASE_COMERCE_URL: process.env.BASE_COMERCE_URL || 'http://localhost:3001',
  // BASE_ORDERS_URL: process.env.BASE_ORDERS_URL || 'http://localhost:3000',
  // Scheduling: process.env.SHEDULING || '* * * * *',
  Secconds: parseInt(process.env.SECONDS) || 1,
  BROKERS:process.env.BROKERS ,
  TOPIC:process.env.TOPIC ,
  GROUP_ID:process.env.GROUP_ID ,
  HEADERS: {
    crossDomain: 'true',
    Accept: 'application/json',
    //Authorization: `Bearer ${localStorage.token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, Content-Type, Authorization, X-Auth-Token',
    'Content-Type': 'application/json',
  }, 
  BD_HOST: process.env.BD_HOST,
  BD_INSTANCE: process.env.BD_INSTANCE,
  BD_DATABASE_NAME: process.env.BD_DATABASE_NAME,
  BD_PWD: process.env.BD_PWD,
  BD_USER: process.env.BD_USER,
  DB_PORT : process.env.BD_PORT,
  
};

