import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class createLocationsTable1676192704033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table(
            {
                name: 'country',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "text"
                    }
                ]
            }
        ));

        await queryRunner.createTable(new Table(
            {
                name: 'state',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "text"
                    }
                ]
            }
        ));

        await queryRunner.createTable(new Table(
            {
                name: 'city',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "text"
                    }
                ]
            }
        ));


        await queryRunner.createTable(new Table(
            {
                name: 'locality',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "text"
                    }
                ]
            }
        ));

        await queryRunner.createTable(new Table(
            {
                name: 'pincode',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "code",
                        type: "text"
                    }
                ]
            }
        ));

        await queryRunner.createTable(new Table(
            {
                name: 'location',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "address_line_one",
                        type: "text"
                    },
                    {
                        name: "address_line_two",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "address_line_three",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "google_maps_link",
                        type: "text",
                        isNullable: true
                    }
                ]
            }
        ));

        await queryRunner.addColumn("state", new TableColumn({
            name: "country_id",
            type: "uuid"
        }))

        await queryRunner.createForeignKey("state", new TableForeignKey({
            columnNames: ["country_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "country",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("city", new TableColumn({
            name: "state_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("city", new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "state",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("locality", new TableColumn({
            name: "pincode_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("locality", new TableForeignKey({
            columnNames: ["pincode_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "pincode",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("locality", new TableColumn({
            name: "city_id",
            type: "uuid"
        }))

        await queryRunner.createForeignKey("locality", new TableForeignKey({
            columnNames: ["city_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "city",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("location", new TableColumn({
            name: "locality_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("location", new TableForeignKey({
            columnNames: ["locality_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "locality",
        }));

        await queryRunner.addColumn("location", new TableColumn({
            name: "city_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("location", new TableForeignKey({
            columnNames: ["city_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "city",
        }));


        await queryRunner.addColumn("location", new TableColumn({
            name: "state_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("location", new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "state",
        }));

        await queryRunner.addColumn("location", new TableColumn({
            name: "pincode_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("location", new TableForeignKey({
            columnNames: ["pincode_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "pincode",
        }));

        await queryRunner.addColumn("location", new TableColumn({
            name: "country_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("location", new TableForeignKey({
            columnNames: ["country_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "country",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey("locality", "city_id");
        await queryRunner.dropForeignKey("locality", "pincode_id");
        await queryRunner.dropForeignKey("city", "state_id");
        await queryRunner.dropForeignKey("state", "country_id");

        await queryRunner.dropForeignKey("location", "country_id");
        await queryRunner.dropForeignKey("location", "pincode_id");
        await queryRunner.dropForeignKey("location", "state_id");
        await queryRunner.dropForeignKey("location", "city_id");
        await queryRunner.dropForeignKey("location", "locality_id");


        await queryRunner.dropColumn("locality", "pincode_id");
        await queryRunner.dropColumn("city", "state_id");
        await queryRunner.dropColumn("state", "country_id");
        await queryRunner.dropColumn("locality", "city_id");

        await queryRunner.dropColumn("location", "country_id");
        await queryRunner.dropColumn("location", "pincode_id");
        await queryRunner.dropColumn("location", "state_id");
        await queryRunner.dropColumn("location", "city_id");
        await queryRunner.dropColumn("location", "locality_id");

        await queryRunner.dropTable("country");
        await queryRunner.dropTable("state");
        await queryRunner.dropTable("pincode");
        await queryRunner.dropTable("locality");
        await queryRunner.dropTable("city");
        await queryRunner.dropTable("location");
    }

}
