import { MeetingStatus } from '@booking/domain/meeting/meetingStatus';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createMeetingTable1688315269456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'meeting',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'appointment_id',
            type: 'uuid'
          },
          {
            name: 'room_name',
            type: 'text'
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(MeetingStatus)
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'meeting',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointment'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('meeting', 'appointment_id');

    await queryRunner.dropTable('meeting');
  }
}
