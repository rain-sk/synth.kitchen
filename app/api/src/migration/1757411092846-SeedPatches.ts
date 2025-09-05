import { MigrationInterface, QueryRunner } from "typeorm";

import { Patch } from "../entity/Patch";
import { User } from "../entity/User";
import { aaa, nnn } from "./seeds/patches";

import { adminEmail } from "../env";

export class SeedPatches1757411092846 implements MigrationInterface {
  name = "SeedPatches1757411092846";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const admin = await userRepository.findOne({
      where: { email: adminEmail },
    });
    const patchRepository = queryRunner.manager.getRepository(Patch);
    for (let p of [aaa, nnn]) {
      const patch = patchRepository.create();
      Object.assign(patch, p);
      patch.creator = admin;
      await patchRepository.save(patch);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const patchRepository = queryRunner.manager.getRepository(Patch);
    for (let p of [aaa, nnn]) {
      patchRepository.delete({ id: p.id });
    }
  }
}
