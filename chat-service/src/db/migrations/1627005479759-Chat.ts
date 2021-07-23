import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Chat1627005479759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chat",
        columns: [
          {
            isPrimary: true,
            length: "36",
            name: "id",
            type: "char",
          },
          {
            length: "25",
            name: "username",
            type: "varchar",
          },
          {
            length: "255",
            name: "message",
            type: "varchar",
          },
          {
            default: "now()",
            name: "createdAt",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("chat");
  }
}
