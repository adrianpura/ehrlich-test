// import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timezone: '+08:00',
  entities: ['dist/src/entities/**/*{.js,.ts}'],
  migrations: ['dist/src/migrations/*{.js,.ts}'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: 'all',
};

export default config;
