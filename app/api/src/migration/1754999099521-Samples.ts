import { MigrationInterface, QueryRunner } from "typeorm";

export class Samples1754999099521 implements MigrationInterface {
  name = "Samples1754999099521";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sample" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_1e92238b098b5a4d13f6422cba7" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sample"`);
  }
}
