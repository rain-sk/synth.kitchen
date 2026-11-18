import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreatedAt1795040317722 implements MigrationInterface {
  name = "UserCreatedAt1795040317722";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    // verification rows are deleted when an account verifies, so verified accounts keep the
    // migration-time value; unverified accounts get their true signup time
    await queryRunner.query(
      `UPDATE "user" u SET "createdAt" = evr."createdAt" FROM email_verification_request evr WHERE evr."userId" = u.id AND evr."createdAt" < u."createdAt"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
  }
}
