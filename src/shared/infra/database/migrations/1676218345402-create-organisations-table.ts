import { Facility } from '@organisation/domain/Facility';
import { PremiseType } from '@organisation/domain/PremiseType';
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createOrganisationsTable1676218345402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organisation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'premise',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text'
          },
          {
            name: 'whatsapp_number',
            type: 'text'
          },
          {
            name: 'type',
            type: 'enum',
            enum: Object.values(PremiseType)
          },
          {
            name: 'facilities',
            isArray: true,
            type: 'enum',
            enum: Object.values(Facility)
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'vet',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text'
          },
          {
            name: 'whatsapp_number',
            type: 'text'
          },
          {
            name: 'photo_url',
            type: 'text'
          },
          {
            name: 'consultation_charge',
            type: 'float'
          },
          {
            name: 'stray_consultation_charge',
            type: 'float'
          },
          {
            name: 'home_visit_charge',
            type: 'float',
            isNullable: true
          },
          {
            name: 'emergency_consultation_charge',
            type: 'float',
            isNullable: true
          },
          {
            name: 'does_home_visit',
            type: 'boolean'
          },
          {
            name: 'qualification',
            type: 'text'
          },
          {
            name: 'months_of_experience',
            type: 'int'
          },
          {
            name: 'specialization',
            type: 'text',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'rating',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'average_rating',
            type: 'float'
          },
          {
            name: 'number_of_ratings',
            type: 'int'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'work_schedule',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'start_hour',
            type: 'float'
          },
          {
            name: 'start_minute',
            type: 'float'
          },
          {
            name: 'end_hour',
            type: 'float'
          },
          {
            name: 'end_minute',
            type: 'float'
          },
          {
            name: 'non_working_days',
            type: 'int',
            isArray: true
          }
        ]
      })
    );

    await queryRunner.addColumn(
      'premise',
      new TableColumn({
        name: 'location_id',
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKey(
      'premise',
      new TableForeignKey({
        columnNames: ['location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'location'
      })
    );

    await queryRunner.addColumn(
      'premise',
      new TableColumn({
        name: 'organisation_id',
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKey(
      'premise',
      new TableForeignKey({
        columnNames: ['organisation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organisation'
      })
    );

    await queryRunner.addColumn(
      'vet',
      new TableColumn({
        name: 'rating_id',
        type: 'uuid',
        isNullable: true
      })
    );

    await queryRunner.createForeignKey(
      'vet',
      new TableForeignKey({
        columnNames: ['rating_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rating'
      })
    );

    await queryRunner.addColumn(
      'vet',
      new TableColumn({
        name: 'premise_id',
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKey(
      'vet',
      new TableForeignKey({
        columnNames: ['premise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'premise'
      })
    );

    await queryRunner.addColumn(
      'work_schedule',
      new TableColumn({
        name: 'vet_id',
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKey(
      'work_schedule',
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('work_schedule', 'vet_id');
    await queryRunner.dropForeignKey('vet', 'premise_id');
    await queryRunner.dropForeignKey('vet', 'rating_id');
    await queryRunner.dropForeignKey('premise', 'organisation_id');
    await queryRunner.dropForeignKey('premise', 'location_id');

    await queryRunner.dropColumn('work_schedule', 'vet_id');
    await queryRunner.dropColumn('vet', 'premise_id');
    await queryRunner.dropColumn('vet', 'rating_id');
    await queryRunner.dropColumn('premise', 'organisation_id');
    await queryRunner.dropColumn('premise', 'location_id');

    await queryRunner.dropTable('work_schedule');
    await queryRunner.dropTable('rating');
    await queryRunner.dropTable('vet');
    await queryRunner.dropTable('premise');
    await queryRunner.dropTable('organisation');
  }
}
