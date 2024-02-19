import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNotificationEnum1701968391867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE public."notification_type_enum" ADD VALUE 'HEALTH_RECORD_NOTIFICATION'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
