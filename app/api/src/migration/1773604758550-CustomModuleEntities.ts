import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomModuleEntities1773604758550 implements MigrationInterface {
  name = "CustomModuleEntities1773604758550";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "saved_custom_module_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "state" json, "ancestorId" uuid, "customModuleId" uuid, CONSTRAINT "PK_e3b5032344a1a78891c41323237" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "custom_module" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "slug" text, "description" text, "public" boolean NOT NULL DEFAULT true, "stateId" uuid, "creatorId" uuid, "forkedFromId" uuid, CONSTRAINT "REL_06ec789d520cd117927f741fa7" UNIQUE ("stateId"), CONSTRAINT "PK_22beefa9947f0b155dceff04b25" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_custom_module_state" ADD CONSTRAINT "FK_32d6d4dd0f26d5eb86e6e0d6db6" FOREIGN KEY ("ancestorId") REFERENCES "saved_custom_module_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_custom_module_state" ADD CONSTRAINT "FK_b6d6ef38dd36aca98bfc4323cc6" FOREIGN KEY ("customModuleId") REFERENCES "custom_module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "custom_module" ADD CONSTRAINT "FK_06ec789d520cd117927f741fa79" FOREIGN KEY ("stateId") REFERENCES "saved_custom_module_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "custom_module" ADD CONSTRAINT "FK_9df42210016922e5c8920851043" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "custom_module" ADD CONSTRAINT "FK_59aecee02bc7e2b9ddcb039fb5c" FOREIGN KEY ("forkedFromId") REFERENCES "custom_module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "custom_module" DROP CONSTRAINT "FK_59aecee02bc7e2b9ddcb039fb5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "custom_module" DROP CONSTRAINT "FK_9df42210016922e5c8920851043"`,
    );
    await queryRunner.query(
      `ALTER TABLE "custom_module" DROP CONSTRAINT "FK_06ec789d520cd117927f741fa79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_custom_module_state" DROP CONSTRAINT "FK_b6d6ef38dd36aca98bfc4323cc6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_custom_module_state" DROP CONSTRAINT "FK_32d6d4dd0f26d5eb86e6e0d6db6"`,
    );
    await queryRunner.query(`DROP TABLE "custom_module"`);
    await queryRunner.query(`DROP TABLE "saved_custom_module_state"`);
  }
}
