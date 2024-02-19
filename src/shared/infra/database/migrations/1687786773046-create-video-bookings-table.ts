import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createVideoBookingsTable1687786773046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'video_vet_mapping',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'booking_id',
            type: 'uuid'
          },
          {
            name: 'vet_id',
            type: 'uuid'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'video_vet_mapping',
      new TableForeignKey({
        columnNames: ['booking_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'booking'
      })
    );

    await queryRunner.createForeignKey(
      'video_vet_mapping',
      new TableForeignKey({
        columnNames: ['vet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vet'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('video_vet_mapping', 'booking_id');
    await queryRunner.dropForeignKey('video_vet_mapping', 'vet_id');

    await queryRunner.dropTable('video_vet_mapping');
  }
}
