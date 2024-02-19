import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddInvoiceTables1703755779613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoice',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'invoice_number',
            type: 'text',
            isUnique: true,
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
            isNullable: true
          },
          {
            name: 'total_amount',
            type: 'real',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'invoice_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false
          },
          {
            name: 'rate',
            type: 'real',
            isNullable: false
          },
          {
            name: 'quantity',
            type: 'real',
            isNullable: false
          },
          {
            name: 'sub_total_amount',
            type: 'real',
            isNullable: false
          },
          {
            name: 'invoice_id',
            type: 'uuid',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'invoiceable_service',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false
          },
          {
            name: 'rate',
            type: 'real',
            isNullable: false
          },
          {
            name: 'vet_id',
            type: 'uuid',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createForeignKeys('invoice', [
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
      })
    ]);

    await queryRunner.createForeignKeys('invoice_item', [
      new TableForeignKey({
        columnNames: ['invoice_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'invoice'
      })
    ]);

    await queryRunner.createForeignKeys('invoiceable_service', [
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('invoiceable_service', 'prescription_details_id');
    await queryRunner.dropForeignKey('invoice_item', 'invoice_id');

    await queryRunner.dropForeignKey('invoice', 'vet_id');
    await queryRunner.dropForeignKey('invoice', 'premise_id');
    await queryRunner.dropForeignKey('invoice', 'user_id');
    await queryRunner.dropForeignKey('invoice', 'animal_id');
    await queryRunner.dropForeignKey('invoice', 'appointment_id');

    await queryRunner.dropTable('invoiceable_service');
    await queryRunner.dropTable('invoice_item');
    await queryRunner.dropTable('invoice');
  }
}
