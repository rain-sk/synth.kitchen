import { MigrationInterface, QueryRunner } from "typeorm";
import { AppInfo } from "../entity/AppInfo";
import { APP_STATE_VERSION } from "synth.kitchen-shared";

export class v0_5_11_1762583925581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appInfoRepo = queryRunner.manager.getRepository(AppInfo);
    const version = await appInfoRepo.findOneOrFail({
      where: { key: "version" },
    });
    version.data = "0.5.11";
    await appInfoRepo.save(version);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const appInfoRepo = queryRunner.manager.getRepository(AppInfo);
    const version = await appInfoRepo.findOneOrFail({
      where: { key: "version" },
    });
    version.data = "0.5.10";
    await appInfoRepo.save(version);
  }
}
