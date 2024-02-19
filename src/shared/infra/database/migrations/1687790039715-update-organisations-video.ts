import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class updateOrganisationsVideo1687790039715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vet',
      new TableColumn({ name: 'auto_assign_video', type: 'boolean', isNullable: true, default: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('vet', 'auto_assign_video');
  }
}
