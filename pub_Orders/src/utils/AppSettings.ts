import * as dotenv from 'dotenv';

dotenv.config();

export const AppSettings = {
  APP_NAME: process.env.APP_NAME,
  BASE_COMERCE_URL: process.env.BASE_COMERCE_URL || 'http://localhost:3001',
  BASE_ORDERS_URL: process.env.BASE_ORDERS_URL || 'http://localhost:3000',
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
  },
};


