import { EntityManager } from "typeorm";

import { User } from "../../entity/User";

const uniqueEmail =
  (transactionalEntityManager: EntityManager) => async (email: string) =>
    !(await transactionalEntityManager
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getExists());

const uniqueUsername =
  (transactionalEntityManager: EntityManager) => async (username: string) =>
    !(await transactionalEntityManager
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getExists());

export class ValidationError extends AggregateError {
  constructor(errors: {
    email: string[];
    username: string[];
    password: string[];
  }) {
    super(Object.entries(errors));
  }
}

export const validateRegistration =
  (transactionalEntityManager?: EntityManager) =>
  async (email: string, username: string, password: string) => {
    const error = {
      email: [] as string[],
      username: [] as string[],
      password: [] as string[],
    };

    if (
      transactionalEntityManager &&
      !(await uniqueEmail(transactionalEntityManager)(email))
    ) {
      error.email.push("Email is already in use.");
    }

    if (
      transactionalEntityManager &&
      !(await uniqueUsername(transactionalEntityManager)(username))
    ) {
      error.username.push("Username is already in use.");
    }

    const invalidPassword = password.length < 8;
    if (invalidPassword) {
      error.password.push("Password must be at least 8 characters.");
    }

    if (
      error.email.length > 0 ||
      error.username.length > 0 ||
      error.password.length > 0
    ) {
      throw new ValidationError(error);
    }
  };
