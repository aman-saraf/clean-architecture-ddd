import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createBookingTables1679746994438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'booking',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'animal_id',
            type: 'uuid'
          },
          {
            name: 'vet_id',
            type: 'uuid'
          },
          {
            name: 'premise_id',
            type: 'uuid'
          },
          {
            name: 'type',
            type: 'text'
          },
          {
            name: 'slot',
            type: 'text'
          },
          {
            name: 'date',
            type: 'text'
          },
          {
            name: 'status',
            type: 'text'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'appointment',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'booking_id',
            type: 'uuid'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'home_booking',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'booking_json',
            type: 'json'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      })
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['animal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animal'
      })
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      })
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['premise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'premise'
      })
    );

    await queryRunner.createForeignKey(
      'appointment',
      new TableForeignKey({
        columnNames: ['booking_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'booking'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointment', 'booking_id');
    await queryRunner.dropForeignKey('booking', 'vet_id');
    await queryRunner.dropForeignKey('booking', 'animal_id');
    await queryRunner.dropForeignKey('booking', 'user_id');
    await queryRunner.dropForeignKey('booking', 'premise_id');

    await queryRunner.dropTable('appointment');
    await queryRunner.dropTable('booking');
    await queryRunner.dropTable('home_booking');
  }
}
