import { DraftHealthRecordStatus } from 'modules/healthRecord/domain/draft/draftHealthRecordStatus';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateDrafthealthrecordsTable1698054287111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'draft_health_record',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'appointment_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'draft_json',
            type: 'json',
            isNullable: false
          },
          {
            name: 'draft_status',
            type: 'enum',
            enum: Object.values(DraftHealthRecordStatus),
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'draft_health_record',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointment'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('draft_health_record', 'appointment_id');

    await queryRunner.dropTable('draft_health_record');
  }
}
