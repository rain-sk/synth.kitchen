import { MigrationInterface, QueryRunner } from "typeorm";

import { Patch } from "../entity/Patch";
import { User } from "../entity/User";

import { adminEmail } from "../env";
import { patches } from "./seeds/patches";
import { SavedPatchState } from "../entity/SavedPatchState";

export class SeedPatches1758462320300 implements MigrationInterface {
  name = "SeedPatches1758462320300";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const admin = await userRepository.findOne({
      where: { email: adminEmail },
    });
    const patchStateRepository =
      queryRunner.manager.getRepository(SavedPatchState);
    const patchRepository = queryRunner.manager.getRepository(Patch);
    for (let p of patches) {
      const patch = patchRepository.create();
      patch.id = p.id;
      patch.name = p.name;
      patch.slug = p.slug;
      patch.creator = admin;

      const savedPatchState = patchStateRepository.create();
      savedPatchState.state = { ...p.state, name: p.name } as any;
      (savedPatchState as any).needsUpgrade = true;

      await patchRepository.save(patch);
      await patchStateRepository.save(savedPatchState);

      patch.state = savedPatchState;
      savedPatchState.patch = patch;
      await patchRepository.save(patch);
      await patchStateRepository.save(savedPatchState);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const patchStateRepository =
      queryRunner.manager.getRepository(SavedPatchState);
    const patchRepository = queryRunner.manager.getRepository(Patch);

    for (let p of patches) {
      const patch = await patchRepository.findOne({
        where: { id: p.id },
        relations: ["state"],
      });
      if (patch) {
        if (patch.state) {
          await patchStateRepository.remove(patch.state);
        }
        await patchRepository.remove(patch);
      }
    }
  }
}
