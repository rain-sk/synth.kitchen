import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1750101797340 implements MigrationInterface {
  name = "InitialSchema1750101797340";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "data" json NOT NULL, "public" boolean NOT NULL DEFAULT false, "chefId" uuid, "forkedFromId" uuid, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "email_verification_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_0199b8436597ab2835e7115852" UNIQUE ("userId"), CONSTRAINT "PK_1dd0d280e40c91826be52f4dcc0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "admin" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "emailVerificationRequest" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "password_reset_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_4bb7fd4a34492ae0e6cc8d30ac" UNIQUE ("userId"), CONSTRAINT "PK_fcf4b02eae1403a2edaf87fd074" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" ADD CONSTRAINT "FK_5ffc9d86db562b0e8fb144951aa" FOREIGN KEY ("chefId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" ADD CONSTRAINT "FK_baaad01dd4f9d161db19a27ca4d" FOREIGN KEY ("forkedFromId") REFERENCES "patch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "email_verification_request" ADD CONSTRAINT "FK_0199b8436597ab2835e71158525" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_request" ADD CONSTRAINT "FK_4bb7fd4a34492ae0e6cc8d30ac8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_reset_request" DROP CONSTRAINT "FK_4bb7fd4a34492ae0e6cc8d30ac8"`
    );
    await queryRunner.query(
      `ALTER TABLE "email_verification_request" DROP CONSTRAINT "FK_0199b8436597ab2835e71158525"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" DROP CONSTRAINT "FK_baaad01dd4f9d161db19a27ca4d"`
    );
    await queryRunner.query(
      `ALTER TABLE "patch" DROP CONSTRAINT "FK_5ffc9d86db562b0e8fb144951aa"`
    );
    await queryRunner.query(`DROP TABLE "password_reset_request"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "email_verification_request"`);
    await queryRunner.query(`DROP TABLE "patch"`);
  }
}
