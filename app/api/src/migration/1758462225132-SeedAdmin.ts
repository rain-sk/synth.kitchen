import { MigrationInterface, QueryRunner } from "typeorm";

import { adminEmail } from "../env";

export class SeedAdmin1758462225132 implements MigrationInterface {
  name = "SeedAdmin1758462225132";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" ("email", "username", "admin", "verified", "password") VALUES ($1, $2, $3, $4, $5)`,
      [adminEmail, "admin", true, false, "seed-dummy-never-used"]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE "email" = $1`, [adminEmail]);
  }
}
