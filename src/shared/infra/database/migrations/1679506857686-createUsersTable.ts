import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createUsersTable1679506857686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            name: 'whatsapp_verfied',
            type: 'boolean'
          },
          {
            name: 'whatsapp_opt_in',
            type: 'boolean'
          },
          {
            name: 'whatsapp_opt_in_timestamp',
            type: 'timestamp without time zone'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'otp',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'otp',
            type: 'text'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'otp',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('otp', 'user_id');

    await queryRunner.dropTable('otp');
  }
}
