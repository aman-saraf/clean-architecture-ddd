import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddInvoiceNumber1704558185540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoice_number',
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
            name: 'invoice_number',
            type: 'real',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createForeignKeys('invoice_number', [
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('invoice_number', 'vet_id');

    await queryRunner.dropTable('invoice_number');
  }
}
