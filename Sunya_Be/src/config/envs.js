require('dotenv').config();

module.exports = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT,
  DB_DEPLOY: process.env.DB_DEPLOY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  EVENTS_SECRET_KEY: process.env.EVENTS_SECRET_KEY,
  USERNAME: process.env.USERNAME,
  ACCESS_KEY: process.env.ACCESS_KEY,
  PARTNER_ID: process.env.PARTNER_ID
};
