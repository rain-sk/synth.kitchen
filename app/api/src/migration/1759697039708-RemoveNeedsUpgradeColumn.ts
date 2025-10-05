import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNeedsUpgradeColumn1759697039708
  implements MigrationInterface
{
  name = "RemoveNeedsUpgradeColumn1759697039708";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "saved_patch_state" DROP COLUMN "needsUpgrade"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "saved_patch_state" ADD "needsUpgrade" boolean NOT NULL DEFAULT true`
    );
  }
}
