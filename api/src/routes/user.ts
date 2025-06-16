import express from "express";
import { hashSync } from "bcrypt";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { PasswordResetRequest } from "../entity/PasswordResetRequest";

import { sendResetPasswordEmail } from "../utils/email";

const UserRouter = express.Router();

UserRouter.get("/user", (req, res) => {
  res.json({ email: "admin@synth.kitchen" });
});

UserRouter.post("/user/reset-password-request", async (req, res) => {
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

UserRouter.post("/user/reset-password", async (req, res) => {
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

    user.password = hashSync(password, 10);
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

export default UserRouter;
