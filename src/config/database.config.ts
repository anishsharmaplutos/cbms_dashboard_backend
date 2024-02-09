import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host:  'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dash',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize:  'development',
  logging:  'development',
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));