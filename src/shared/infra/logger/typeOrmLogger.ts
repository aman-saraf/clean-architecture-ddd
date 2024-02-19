import { Logger, QueryRunner } from 'typeorm';
import LOG from './logger';

export class TypeORMLogger implements Logger {
  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    LOG.info('Query %s, Parameters: %s', query, parameters);
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: QueryRunner | undefined
  ) {
    LOG.error('Query %s, Parameters: %s, Error: %s', query, parameters, error);
  }
  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    LOG.warn('Query %s, Parameters: %s, Time: %s', query, parameters, time);
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    LOG.info('%s', message);
  }
  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    LOG.info('%s', message);
  }
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner | undefined) {
    LOG.info('%s', message);
  }
}
