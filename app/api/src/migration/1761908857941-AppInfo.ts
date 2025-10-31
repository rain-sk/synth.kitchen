import { APP_STATE_VERSIONS } from "synth.kitchen-shared";
import { MigrationInterface, QueryRunner } from "typeorm";
import { AppInfo } from "../entity/AppInfo";

export class AppInfo1761908857941 implements MigrationInterface {
  name = "AppInfo1761908857941";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_info" ("key" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "data" character varying NOT NULL, CONSTRAINT "PK_2b1615ada07bebe071f85e52fc6" PRIMARY KEY ("key"))`
    );
    const appInfoRepo = queryRunner.manager.getRepository(AppInfo);
    await appInfoRepo.save(
      appInfoRepo.create({
        key: "version",
        data: "0.5.10",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "app_info"`);
  }
}
