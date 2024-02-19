import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class updateBookingTable1685714691592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('booking', new TableColumn({ name: 'type', type: 'text', isNullable: true }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('booking', 'type');
  }
}
