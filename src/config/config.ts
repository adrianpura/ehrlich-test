import { Images } from 'src/entities/images.entity';
import { Subscriber } from 'src/entities/subscriber.entity';
import { Users } from 'src/entities/users.entity';

export const config = () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timezone: '+08:00',
    // entities: ['dist/src/entities/**/*{.js,.ts}'],
    entities: [Subscriber, Users, Images],
    migrations: ['dist/src/migrations/*{.js,.ts}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    keepConnectionAlive: true,
    synchronize: false,
    logging: 'all',
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  },
});
