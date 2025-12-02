import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEmailVerification1764659512400 implements MigrationInterface {
  name = "FixEmailVerification1764659512400";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "emailVerificationRequest"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "emailVerificationRequest" uuid`
    );
  }
}
