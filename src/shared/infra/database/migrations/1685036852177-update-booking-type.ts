import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBookingType1685036852177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('booking', 'type', 'purpose');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('booking', 'purpose', 'type');
  }
}
