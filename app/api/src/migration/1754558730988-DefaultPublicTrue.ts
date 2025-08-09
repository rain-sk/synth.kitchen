import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultPublicTrue1754558730988 implements MigrationInterface {
  name = "DefaultPublicTrue1754558730988";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patch" ALTER COLUMN "public" SET DEFAULT true`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patch" ALTER COLUMN "public" SET DEFAULT false`
    );
  }
}
