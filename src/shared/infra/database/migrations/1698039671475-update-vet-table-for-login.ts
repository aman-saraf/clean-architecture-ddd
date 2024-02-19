import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateVetTableForLogin1698039671475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vet',
      new TableColumn({ name: 'login_allowed', type: 'boolean', isNullable: true, default: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('vet', 'login_allowed');
  }
}
