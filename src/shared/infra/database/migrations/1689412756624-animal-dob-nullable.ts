import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class animalDobNullable1689412756624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'animal',
      'date_of_birth',
      new TableColumn({
        name: 'date_of_birth',
        type: 'date',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'animal',
      'date_of_birth',
      new TableColumn({
        name: 'date_of_birth',
        type: 'date'
      })
    );
  }
}
