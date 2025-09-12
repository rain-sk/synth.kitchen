import { MigrationInterface, QueryRunner } from "typeorm";

import { Patch } from "../entity/Patch";
import { User } from "../entity/User";

import { adminEmail } from "../env";
import { patches } from "./seeds/patches";

export class SeedPatches1757636495393 implements MigrationInterface {
  name = "SeedPatches1757636495393";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const admin = await userRepository.findOne({
      where: { email: adminEmail },
    });
    const patchRepository = queryRunner.manager.getRepository(Patch);
    for (let p of patches) {
      const patch = patchRepository.create();
      Object.assign(patch, p);
      patch.creator = admin;
      patch.needsUpgrade = true;
      await patchRepository.save({ ...patch });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const patchRepository = queryRunner.manager.getRepository(Patch);
    for (let p of patches) {
      patchRepository.delete({ id: p.id });
    }
  }
}
