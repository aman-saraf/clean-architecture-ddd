import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class VetInitiatedBooking1701106142915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'booking',
      new TableColumn({ name: 'is_vet_initiated', type: 'boolean', isNullable: false, default: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('booking', 'is_vet_initiated');
  }
}
