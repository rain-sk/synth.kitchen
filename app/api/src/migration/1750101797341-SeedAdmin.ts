import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../entity/User";
import { PasswordResetRequest } from "../entity/PasswordResetRequest";
import { EmailVerificationRequest } from "../entity/EmailVerificationRequest";
import { sendResetPasswordEmail } from "../utils/email";
import { adminEmail, appOrigin } from "../env";

export class SeedAdmin1750101797341 implements MigrationInterface {
  name = "SeedAdmin1750101797341";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const passwordResetRepository =
      queryRunner.manager.getRepository(PasswordResetRequest);

    const admin = await userRepository.create({
      email: adminEmail,
      username: "admin",
      password: "_",
    });

    const passwordResetRequest = await passwordResetRepository.create();
    passwordResetRequest.user = admin;
    await userRepository.save(admin);
    await passwordResetRepository.save(passwordResetRequest);
    await sendResetPasswordEmail(admin.email, {
      appOrigin,
      resetKey: passwordResetRequest.id,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const admin = await entityManager
      .getRepository(User)
      .findOneBy({ email: adminEmail });

    await entityManager
      .createQueryBuilder()
      .delete()
      .from(PasswordResetRequest)
      .where("user = :user", { user: admin.id })
      .execute();
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(EmailVerificationRequest)
      .where("user = :user", { user: admin.id })
      .execute();

    await entityManager.getRepository(User).delete(admin.id);
  }
}
