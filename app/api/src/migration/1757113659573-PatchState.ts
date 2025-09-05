import { MigrationInterface, QueryRunner } from "typeorm";
import { PatchState } from "synth.kitchen-shared";

export class PatchState1757113659573 implements MigrationInterface {
  name = "PatchState1757113659573";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const patches = (await queryRunner.query(
      `SELECT id, data from "patch"`
    )) as { id: string; data: string }[];

    await queryRunner.query(`ALTER TABLE "patch" DROP COLUMN "data"`);
    await queryRunner.query(
      `ALTER TABLE "patch" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "patch" ADD "state" json`);

    const { upgrade } = await import("./module-versions/upgrade");

    for (let patch of patches) {
      const data: PatchState = patch.data as PatchState;
      const state: PatchState = {
        modules: data.modules,
        modulePositions: data.modulePositions,
        connections: data.connections,
        connectors: data.connectors,
      };

      for (let key in state.modules) {
        const module = state.modules[key];
        module.state = upgrade(module.type, module.state);
      }

      await queryRunner.query(
        `UPDATE "patch" SET "state" = $1 WHERE "id" = $2`,
        [JSON.stringify(state), patch.id]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patch" DROP COLUMN "state"`);
    await queryRunner.query(`ALTER TABLE "patch" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "patch" ADD "data" json NOT NULL`);
  }
}
