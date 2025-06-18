import express from "express";
import { hash, compare } from "bcrypt";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { PasswordResetRequest } from "../entity/PasswordResetRequest";

import { sendResetPasswordEmail } from "../utils/email";
import { bcryptCost } from "../env";
import { jwtSign } from "../utils/jwtSign";
import { Request as JwtRequest } from "express-jwt";
import { jwt } from "../middleware/jwt";

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
          password,
        })
        .getOneOrFail();
      if (await compare(password, user.password)) {
        const token = await jwtSign({
          id: user.id,
          email: user.email,
          admin: user.admin,
          verified: user.verified,
        });
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

const uniqueEmail = async (email: string) =>
  !(await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email })
    .getExists());

const uniqueUsername = async (username: string) =>
  !(await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username })
    .getExists());

const validateRegistration = (
  email: string,
  username: string,
  password: string
) => {
  let error = {
    email: [] as string[],
    username: [] as string[],
    password: [] as string[],
  };

  if (!uniqueEmail(email)) {
    error.email.push("Email is already in use.");
  }

  if (!uniqueUsername(username)) {
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
    undefined;
  }
};
AuthRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const error = validateRegistration(email, username, password);
  if (!error) {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", {
          email,
          password,
        })
        .getOneOrFail();
      if (await compare(password, user.password)) {
        const token = await jwtSign({
          id: user.id,
          email: user.email,
          admin: user.admin,
          verified: user.verified,
        });
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

AuthRouter.post("/reset-password-request", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).send();
    return;
  }

  let user: User | undefined;
  try {
    user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOneOrFail();
  } catch (e) {
    console.error("Failed to find user with the given email.", e);
  }
  if (user) {
    const passwordResetRepository =
      AppDataSource.getRepository(PasswordResetRequest);
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(PasswordResetRequest)
      .where("user = :user", { user: user.id })
      .execute();
    const passwordResetRequest = await passwordResetRepository.create();
    passwordResetRequest.user = user;
    await passwordResetRepository.save(passwordResetRequest);
    sendResetPasswordEmail(user.email, passwordResetRequest.id);
  }
  res.status(200).json({ success: true });
});

AuthRouter.post("/reset-password", async (req, res) => {
  const password = req.body.password;
  const key = req.body.key;
  if (!password && !key) {
    res.status(400).send();
    return;
  }

  let request: PasswordResetRequest | undefined;
  let user: User | undefined;
  try {
    const requestRepository = AppDataSource.getRepository(PasswordResetRequest);
    request = await requestRepository.findOneOrFail({
      where: { id: key },
      relations: { user: true },
    });
    const userRepository = AppDataSource.getRepository(User);
    user = await userRepository.findOneByOrFail({
      id: request.user.id,
    });

    user.password = await hash(password, bcryptCost);
    await userRepository.save(user);
    await requestRepository.remove(request);
  } catch (e) {
    console.error(e);
    if (!request) {
      console.error("No reset request with the given key.");
    } else if (!user) {
      console.error("No user found with the request's foreign key.");
    }
  }
  res.status(200).json({ success: true });
});
