import env from './env'

const databaseConfig = {
  type: 'postgres',
  synchronize: false,
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  schema: 'public',
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: false,
  logging: ['local', 'development'].includes(env.NODE_ENV),
}

module.exports = databaseConfig
