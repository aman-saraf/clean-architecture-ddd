import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createAnimalsTable1679738125345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animal',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'is_pet',
            type: 'boolean'
          },
          {
            name: 'date_of_birth',
            type: 'date'
          },
          {
            name: 'breed_id',
            type: 'uuid'
          },
          {
            name: 'animal_type_id',
            type: 'uuid'
          },
          {
            name: 'user_id',
            type: 'uuid'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'animal_type',
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
        name: 'breed',
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
            name: 'animal_type_id',
            type: 'uuid'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'animal',
      new TableForeignKey({
        columnNames: ['breed_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'breed'
      })
    );

    await queryRunner.createForeignKey(
      'animal',
      new TableForeignKey({
        columnNames: ['animal_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animal_type'
      })
    );

    await queryRunner.createForeignKey(
      'animal',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      })
    );

    await queryRunner.createForeignKey(
      'breed',
      new TableForeignKey({
        columnNames: ['animal_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animal_type'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('breed', 'animal_type_id');
    await queryRunner.dropForeignKey('animal', 'user_id');
    await queryRunner.dropForeignKey('animal', 'animal_type_id');
    await queryRunner.dropForeignKey('animal', 'breed_id');

    await queryRunner.dropTable('breed');
    await queryRunner.dropTable('animal_type');
    await queryRunner.dropTable('animal');
  }
}
