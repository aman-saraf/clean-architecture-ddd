import { HealthRecordType } from 'modules/healthRecord/domain/healthRecordType';
import { DietaryConsideration } from 'modules/healthRecord/domain/prescription/prescriptionDetails/medicine/dietaryConsideration';
import { TimeOfDay } from 'modules/healthRecord/domain/prescription/prescriptionDetails/medicine/timeOfDay';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateHealthrecordsTable1697908123212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'health_record',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'vet_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'premise_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'animal_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'date',
            type: 'text',
            isNullable: false
          },
          {
            name: 'appointment_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'health_record_type',
            type: 'enum',
            enum: Object.values(HealthRecordType),
            isNullable: false
          },
          {
            name: 'vitals_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'prescription_details_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true
          },
          {
            name: 'follow_up_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'follow_up_reason',
            type: 'text',
            isNullable: true
          },
          {
            name: 'vaccination',
            type: 'text',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'medicine',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'medicine_name',
            type: 'text',
            isNullable: false
          },
          {
            name: 'dosage',
            type: 'text',
            isNullable: false
          },
          {
            name: 'time_of_day',
            isArray: true,
            type: 'enum',
            enum: Object.values(TimeOfDay),
            isNullable: false
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: false
          },
          {
            name: 'dietary_consideration',
            type: 'enum',
            enum: Object.values(DietaryConsideration),
            isNullable: true
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true
          },
          {
            name: 'prescription_details_id',
            type: 'uuid',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'prescription_details',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'complaint',
            type: 'text',
            isNullable: false
          },
          {
            name: 'observation',
            type: 'text',
            isNullable: false
          },
          {
            name: 'treatment',
            type: 'text',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'vitals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'body_weight',
            type: 'real'
          },
          {
            name: 'temperature',
            type: 'real'
          },
          {
            name: 'mucous_membrane',
            type: 'text',
            isNullable: true
          },
          {
            name: 'respiratory_rate',
            type: 'real',
            isNullable: true
          },
          {
            name: 'heart_rate',
            type: 'real',
            isNullable: true
          },
          {
            name: 'temperament',
            type: 'text',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createForeignKeys('health_record', [
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      }),
      new TableForeignKey({
        columnNames: ['premise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'premise'
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      }),
      new TableForeignKey({
        columnNames: ['animal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animal'
      }),
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointment'
      }),
      new TableForeignKey({
        columnNames: ['vitals_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vitals'
      }),
      new TableForeignKey({
        columnNames: ['prescription_details_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'prescription_details'
      })
    ]);

    await queryRunner.createForeignKeys('medicine', [
      new TableForeignKey({
        columnNames: ['prescription_details_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'prescription_details'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropForeignKey('medicine', new TableForeignKey({
      columnNames: ['prescription_details_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'prescription_details'
    }))

    await queryRunner.dropForeignKeys('health_record', [
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      }),
      new TableForeignKey({
        columnNames: ['premise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'premise'
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      }),
      new TableForeignKey({
        columnNames: ['animal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animal'
      }),
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointment'
      }),
      new TableForeignKey({
        columnNames: ['vitals_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vitals'
      }),
      new TableForeignKey({
        columnNames: ['prescription_details_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'prescription_details'
      })
    ])

    await queryRunner.dropTable('vitals')

    await queryRunner.dropTable('prescription_details')

    await queryRunner.dropTable('medicine')

    await queryRunner.dropTable('health_record')

  }
}
