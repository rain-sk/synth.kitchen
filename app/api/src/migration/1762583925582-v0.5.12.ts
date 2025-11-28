import { MigrationInterface, QueryRunner } from "typeorm";
import { AppInfo } from "../entity/AppInfo";

export class v0_5_12_1762583925582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appInfoRepo = queryRunner.manager.getRepository(AppInfo);
    const version = await appInfoRepo.findOneOrFail({
      where: { key: "version" },
    });
    version.data = "0.5.12";
    await appInfoRepo.save(version);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const appInfoRepo = queryRunner.manager.getRepository(AppInfo);
    const version = await appInfoRepo.findOneOrFail({
      where: { key: "version" },
    });
    version.data = "0.5.11";
    await appInfoRepo.save(version);
  }
}
