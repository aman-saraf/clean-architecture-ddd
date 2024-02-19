import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class updateBookingTableVideo1687613290424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'booking',
      'vet_id',
      new TableColumn({ name: 'vet_id', type: 'uuid', isNullable: true })
    );

    await queryRunner.changeColumn(
      'booking',
      'premise_id',
      new TableColumn({ name: 'premise_id', type: 'uuid', isNullable: true })
    );

    await queryRunner.addColumn('booking', new TableColumn({ name: 'start_hour', type: 'int', isNullable: true }));
    await queryRunner.addColumn('booking', new TableColumn({ name: 'start_minute', type: 'int', isNullable: true }));
    await queryRunner.addColumn('booking', new TableColumn({ name: 'end_hour', type: 'int', isNullable: true }));
    await queryRunner.addColumn('booking', new TableColumn({ name: 'end_minute', type: 'int', isNullable: true }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'booking',
      'vet_id',
      new TableColumn({ name: 'vet_id', type: 'uuid', isNullable: false })
    );

    await queryRunner.changeColumn(
      'booking',
      'premise_id',
      new TableColumn({ name: 'premise_id', type: 'uuid', isNullable: false })
    );

    await queryRunner.dropColumn('booking', 'start_hour');
    await queryRunner.dropColumn('booking', 'start_minute');
    await queryRunner.dropColumn('booking', 'end_hour');
    await queryRunner.dropColumn('booking', 'end_minute');
  }
}
