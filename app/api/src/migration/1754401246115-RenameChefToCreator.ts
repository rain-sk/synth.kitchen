import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameChefToCreator1754401246115 implements MigrationInterface {
  name = "RenameChefToCreator1754401246115";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patch" DROP CONSTRAINT "FK_5ffc9d86db562b0e8fb144951aa"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" DROP CONSTRAINT "FK_baaad01dd4f9d161db19a27ca4d"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" RENAME COLUMN "chefId" TO "creatorId"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" ADD CONSTRAINT "FK_ef9d57eedb0d49608ba29e61eae" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" ADD CONSTRAINT "FK_efcf1841028111e004b41b325d6" FOREIGN KEY ("forkedFromId") REFERENCES "patch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patch" DROP CONSTRAINT "FK_efcf1841028111e004b41b325d6"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" DROP CONSTRAINT "FK_ef9d57eedb0d49608ba29e61eae"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" RENAME COLUMN "creatorId" TO "chefId"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" ADD CONSTRAINT "FK_baaad01dd4f9d161db19a27ca4d" FOREIGN KEY ("forkedFromId") REFERENCES "patch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" ADD CONSTRAINT "FK_5ffc9d86db562b0e8fb144951aa" FOREIGN KEY ("chefId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
