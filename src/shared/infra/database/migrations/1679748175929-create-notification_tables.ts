import { NotificationType } from '@notification/domain/notificationType';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createNotificationTables1679748175929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'type',
            type: 'enum',
            enum: Object.values(NotificationType)
          },
          {
            name: 'wa_message_id',
            type: 'text'
          },
          {
            name: 'booking_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'appointment_id',
            type: 'uuid',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'notification',
      new TableForeignKey({
        columnNames: ['booking_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'booking'
      })
    );

    await queryRunner.createForeignKey(
      'notification',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointment'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('notification', 'booking_id');
    await queryRunner.dropForeignKey('notification', 'appointment_id');

    await queryRunner.dropTable('notification');
  }
}
