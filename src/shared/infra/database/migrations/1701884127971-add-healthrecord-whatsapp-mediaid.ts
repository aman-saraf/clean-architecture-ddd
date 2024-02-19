import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddHealthrecordWhatsappMediaid1701884127971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'health_record',
      new TableColumn({ name: 'whatsapp_media_id', type: 'text', isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('health_record', 'whatsapp_media_id');
  }
}
