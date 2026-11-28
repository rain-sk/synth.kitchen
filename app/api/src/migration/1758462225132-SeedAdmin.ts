import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../entity/User";

import { adminEmail } from "../env";

export class SeedAdmin1758462225132 implements MigrationInterface {
  name = "SeedAdmin1758462225132";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const admin = await userRepository.create({
      email: adminEmail,
      username: "admin",
      admin: true,
      verified: false,
    });

    await userRepository.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const admin = await entityManager
      .getRepository(User)
      .findOneBy({ email: adminEmail });

    if (admin) {
      await entityManager.getRepository(User).delete(admin.id);
    }
  }
}
