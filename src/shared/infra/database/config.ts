import { DataSource } from 'typeorm';
import { TypeORMLogger } from '../logger/typeOrmLogger';
import LOG from '../logger/logger';

export const createPostgresDataSource = (): DataSource => {
  const { PG_USERNAME, PG_PASSWORD, PG_DATABASE, PG_DB_HOST, PG_DB_PORT } = process.env;

  LOG.info(__dirname + '/migrations/*.ts');

  return new DataSource({
    type: 'postgres',
    host: PG_DB_HOST,
    port: +(PG_DB_PORT as string),
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    logging: 'all',
    logger: new TypeORMLogger(),
    entities: [__dirname + '../../../../../src/modules/**/repository/**/*.entity.ts'],
    migrations: [__dirname + '/migrations/*.ts']
  });
};
