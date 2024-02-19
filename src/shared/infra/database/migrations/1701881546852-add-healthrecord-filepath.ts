import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddHealthrecordFilepath1701881546852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'health_record',
      new TableColumn({ name: 'file_path', type: 'text', isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('health_record', 'file_path');
  }
}
