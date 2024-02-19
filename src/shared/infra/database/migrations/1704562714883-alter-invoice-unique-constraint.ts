import { MigrationInterface, QueryRunner, TableColumn, TableUnique } from 'typeorm';

export class AlterInvoiceUniqueConstraint1704562714883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'invoice',
      'invoice_number',
      new TableColumn({ name: 'invoice_number', type: 'text', isNullable: false })
    );

    await queryRunner.createUniqueConstraint('invoice', new TableUnique({ columnNames: ['vet_id', 'invoice_number'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
