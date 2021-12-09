import { config } from 'dotenv'
config()

export default {
  PORT: process.env.PORT,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  NODE_ENV: process.env.NODE_ENV,

  TZ: process.env.TZ || 'America/Sao_Paulo',
}
