import express from "express";
import { hash, compare } from "bcrypt";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { PasswordResetRequest } from "../entity/PasswordResetRequest";

import {
  sendPasswordChangedEmail,
  sendResetPasswordEmail,
} from "../utils/email";
import { bcryptCost } from "../env";
import { jwtSign } from "../utils/jwtSign";
import { Request as JwtRequest } from "express-jwt";
import { jwt } from "../middleware/jwt";
import { EntityManager } from "typeorm";

export const AuthRouter = express.Router();

AuthRouter.get("/user", jwt, (req: JwtRequest, res) => {
  res.json({
    user: {
      email: req.auth.email,
      id: req.auth.id,
      verified: req.auth.verified,
    },
  });
});

AuthRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", {
          email,
        })
        .getOneOrFail();
      if (await compare(password, user.password)) {
        const token = await jwtSign(
          user.admin
            ? {
                id: user.id,
                admin: user.admin,
                email: user.email,
                username: user.username,
                verified: user.verified,
              }
            : {
                id: user.id,
                email: user.email,
                username: user.username,
                verified: user.verified,
              }
        );
        res.status(200).json({
          jwt: token,
        });
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }
  res.status(401).send("Login failed.");
});

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

const validateRegistration =
  (transactionalEntityManager: EntityManager) =>
  async (email: string, username: string, password: string) => {
    let error = {
      email: [] as string[],
      username: [] as string[],
      password: [] as string[],
    };

    if (!(await uniqueEmail(transactionalEntityManager)(email))) {
      error.email.push("Email is already in use.");
    }

    if (!(await uniqueUsername(transactionalEntityManager)(username))) {
      error.username.push("Username is already in use.");
    }

    const invalidPasswordRegExp = new RegExp(
      /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/
    );
    const invalidPassword = invalidPasswordRegExp.test(password);
    if (invalidPassword) {
      error.password.push(
        "Password must be at least 8 characters, and must contain at least one lowercase and one uppercase letter."
      );
    }

    if (
      error.email.length > 0 ||
      error.username.length > 0 ||
      error.password.length > 0
    ) {
      return error;
    } else {
      return undefined;
    }
  };

AuthRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      try {
        const error = await validateRegistration(transactionalEntityManager)(
          email,
          username,
          password
        );
        if (error) {
          res.status(400).json({ error });
          return;
        }
      } catch (e) {
        console.error(e);
        res.status(500).json({ e });
        return;
      }

      try {
        const user = await transactionalEntityManager
          .getRepository(User)
          .create({
            email,
            username,
            password: await hash(password, bcryptCost),
          });
        if (user) {
          const token = await jwtSign(
            user.admin
              ? {
                  id: user.id,
                  admin: user.admin,
                  email: user.email,
                  username: user.username,
                  verified: user.verified,
                }
              : {
                  id: user.id,
                  email: user.email,
                  username: user.username,
                  verified: user.verified,
                }
          );
          res.status(200).json({
            jwt: token,
          });
          return;
        }
      } catch (e) {
        console.error(e);
      }

      res.status(401).send("Login failed.");
    }
  );
});

AuthRouter.post("/reset-password-request", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).send();
    return;
  }

  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      let user: User | undefined;
      try {
        user = await transactionalEntityManager
          .getRepository(User)
          .createQueryBuilder("user")
          .where("user.email = :email", { email })
          .getOneOrFail();
      } catch (e) {
        console.error("Failed to find user with the given email.", e);
      }
      if (user) {
        const passwordResetRepository =
          transactionalEntityManager.getRepository(PasswordResetRequest);
        await transactionalEntityManager
          .createQueryBuilder()
          .delete()
          .from(PasswordResetRequest)
          .where("user = :user", { user: user.id })
          .execute();
        const passwordResetRequest = await passwordResetRepository.create();
        passwordResetRequest.user = user;
        await passwordResetRepository.save(passwordResetRequest);
        sendResetPasswordEmail(user.email, passwordResetRequest.id);
      }
    }
  );
  res.status(200).json({ success: true });
});

AuthRouter.post("/reset-password", async (req, res) => {
  const password = req.body.password;
  const key = req.body.key;
  if (!password && !key) {
    res.status(400).send();
    return;
  }

  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      let request: PasswordResetRequest | undefined;
      let user: User | undefined;
      try {
        const requestRepository =
          transactionalEntityManager.getRepository(PasswordResetRequest);

        request = await requestRepository.findOneOrFail({
          where: { id: key },
          relations: { user: true },
        });

        const userRepository = transactionalEntityManager.getRepository(User);
        user = await userRepository.findOneByOrFail({
          id: request.user.id,
        });

        user.password = await hash(password, bcryptCost);
        await userRepository.save(user);
        await requestRepository.remove(request);
        await sendPasswordChangedEmail(user.email);
      } catch (e) {
        console.error(e);
        if (!request) {
          console.error("No reset request with the given key.");
        } else if (!user) {
          console.error("No user found with the request's foreign key.");
        }
      }
    }
  );
  res.status(200).json({ success: true });
});
