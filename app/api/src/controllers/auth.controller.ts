import { Request as JwtRequest } from "express-jwt";
import { UserInfoAuthenticated } from "synth.kitchen-shared";

import { User } from "../entity/User";
import { jwtSign } from "../utils/jwt-sign";
import { ValidationError } from "../services/validate/registration";

import { UserService } from "../services/user.service";
import { PasswordService } from "../services/password.service";
import { isUUID } from "class-validator";
import { VerificationService } from "../services/verification.service";

export class AuthController {
  static getUser = async (req: JwtRequest, res) => {
    try {
      if (
        !req.auth ||
        !req.auth.id ||
        !(await UserService.userExists({ id: req.auth.id }))
      ) {
        throw new Error("JWT represents non-existent user");
      }

      const user = await UserService.getUser({ id: req.auth.id });

      const authorizedUser: UserInfoAuthenticated = {
        id: user.id,
        email: user.email,
        username: user.username,
        verified: user.verified,
      };

      res.json({
        user: authorizedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };

  static login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(401).send("");
      return;
    }

    let user: User | void;
    try {
      user = await UserService.login(email, password);
    } catch (e) {
      console.error(e);
    }

    if (!user || !user.id) {
      res.status(404).send();
      return;
    }

    const token = await jwtSign(user);
    res.status(200).json({
      jwt: token,
    });
  };

  static register = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let result: User | ValidationError | void;
    try {
      result = await UserService.register({ email, username, password });
    } catch (e) {
      console.error(e);
    }

    if (result && result instanceof ValidationError) {
      res.status(400).json({ errors: Object.fromEntries(result.errors) });
    } else if (result && result instanceof User && result.id) {
      res.status(200).json({
        jwt: await jwtSign(result),
      });
    } else {
      res.status(400).send("Registration failed.");
    }
  };

  static resetPassword = async (req, res) => {
    const password = req.body.password;
    const resetKey = req.body.resetKey;

    if (!password && !resetKey) {
      res.status(400).send("");
      return;
    }

    try {
      await PasswordService.resetPassword(password, resetKey);
    } catch (error) {
      console.error(error);
    }

    // always return a successful code; don't give attackers any information
    res.status(200).json({ success: true });
  };

  static requestResetPassword = async (req, res) => {
    const email = req.body.email;

    if (!email) {
      res.status(400).send();
      return;
    }

    try {
      await PasswordService.requestReset(email);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send("");
    }
  };

  static verify = async (req, res) => {
    const key = req.params.key;

    if (!key || !isUUID(key, 4)) {
      res.status(400).send();
      return;
    }

    try {
      res.status(200).json({ success: await VerificationService.verify(key) });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };

  static deleteUser = async (req: JwtRequest, res) => {
    const password = req.headers["x-password"];

    if (!password || Array.isArray(password)) {
      res.sendStatus(403);
      return;
    }

    if (!(await UserService.login(req.auth.email, password))) {
      res.sendStatus(403);
      return;
    }

    try {
      const success = await UserService.deleteUser(req.auth.id);
      res.status(200).json({ success });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };
}
