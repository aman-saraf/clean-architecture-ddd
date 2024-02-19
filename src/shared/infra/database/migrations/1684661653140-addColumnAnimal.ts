import { Gender } from '@animal/domain/gender';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnAnimal1684661653140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'animal',
      new TableColumn({
        name: 'name',
        type: 'text',
        isNullable: true
      })
    );

    await queryRunner.addColumn(
      'animal',
      new TableColumn({
        name: 'gender',
        type: 'enum',
        enum: Object.values(Gender),
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('animal', 'name');
    await queryRunner.dropColumn('animal', 'gender');
  }
}
