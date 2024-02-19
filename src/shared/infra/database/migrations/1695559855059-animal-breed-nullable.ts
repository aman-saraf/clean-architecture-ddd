import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class animalBreedNullable1695559855059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'animal',
            'breed_id',
            new TableColumn({
                name: 'breed_id',
                type: 'uuid',
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'animal',
            'breed_id',
            new TableColumn({
                name: 'breed_id',
                type: 'uuid'
            })
        );
    }

}
