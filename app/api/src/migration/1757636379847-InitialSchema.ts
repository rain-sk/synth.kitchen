import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1757636379847 implements MigrationInterface {
    name = 'InitialSchema1757636379847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sample" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_1e92238b098b5a4d13f6422cba7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "slug" text NOT NULL, "state" json, "public" boolean NOT NULL DEFAULT true, "needsUpgrade" boolean NOT NULL DEFAULT true, "creatorId" uuid, "forkedFromId" uuid, CONSTRAINT "PK_3b32ee1644d35bce4a0db1703f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_verification_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_0199b8436597ab2835e7115852" UNIQUE ("userId"), CONSTRAINT "PK_1dd0d280e40c91826be52f4dcc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "admin" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "emailVerificationRequest" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password_reset_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_4bb7fd4a34492ae0e6cc8d30ac" UNIQUE ("userId"), CONSTRAINT "PK_fcf4b02eae1403a2edaf87fd074" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patch" ADD CONSTRAINT "FK_ef9d57eedb0d49608ba29e61eae" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patch" ADD CONSTRAINT "FK_efcf1841028111e004b41b325d6" FOREIGN KEY ("forkedFromId") REFERENCES "patch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email_verification_request" ADD CONSTRAINT "FK_0199b8436597ab2835e71158525" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_reset_request" ADD CONSTRAINT "FK_4bb7fd4a34492ae0e6cc8d30ac8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset_request" DROP CONSTRAINT "FK_4bb7fd4a34492ae0e6cc8d30ac8"`);
        await queryRunner.query(`ALTER TABLE "email_verification_request" DROP CONSTRAINT "FK_0199b8436597ab2835e71158525"`);
        await queryRunner.query(`ALTER TABLE "patch" DROP CONSTRAINT "FK_efcf1841028111e004b41b325d6"`);
        await queryRunner.query(`ALTER TABLE "patch" DROP CONSTRAINT "FK_ef9d57eedb0d49608ba29e61eae"`);
        await queryRunner.query(`DROP TABLE "password_reset_request"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "email_verification_request"`);
        await queryRunner.query(`DROP TABLE "patch"`);
        await queryRunner.query(`DROP TABLE "sample"`);
    }

}
