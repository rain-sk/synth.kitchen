import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsistentCreatedAtColumnName1757511544274
  implements MigrationInterface
{
  name = "ConsistentCreatedAtColumnName1757511544274";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_verification_request" RENAME COLUMN "createdDate" TO "createdAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_request" RENAME COLUMN "createdDate" TO "createdAt"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_reset_request" RENAME COLUMN "createdAt" TO "createdDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "email_verification_request" RENAME COLUMN "createdAt" TO "createdDate"`
    );
  }
}
