import { MigrationInterface, QueryRunner } from "typeorm";

export class DropPasswordAndAddEmailCodes1795040317723 implements MigrationInterface {
  name = "DropPasswordAndAddEmailCodes1795040317723";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_verification_request" DROP CONSTRAINT IF EXISTS "FK_email_verification_request_user"`
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "email_verification_request"`
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_request" DROP CONSTRAINT IF EXISTS "FK_password_reset_request_user"`
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "password_reset_request"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "email_code" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "codeHash" text NOT NULL,
      "expiresAt" timestamp NOT NULL,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "userId" uuid NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "password" text NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "email_verification_request" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "userId" uuid NOT NULL REFERENCES "user"("id"), "createdAt" timestamp NOT NULL DEFAULT now())`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "password_reset_request" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "userId" uuid NOT NULL REFERENCES "user"("id"), "createdAt" timestamp NOT NULL DEFAULT now())`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "email_code"`);
  }
}
