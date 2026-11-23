import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreatedAt1795040317722 implements MigrationInterface {
  name = "UserCreatedAt1795040317722";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `UPDATE "user" u SET "createdAt" = evr."createdAt" FROM email_verification_request evr WHERE evr."userId" = u.id AND evr."createdAt" < u."createdAt"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
  }
}
