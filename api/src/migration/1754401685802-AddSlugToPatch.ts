import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToPatch1754401685802 implements MigrationInterface {
  name = "AddSlugToPatch1754401685802";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patch" ADD "slug" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patch" DROP COLUMN "slug"`);
  }
}
