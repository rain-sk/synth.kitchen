import { Request as JwtRequest } from "express-jwt";
import { UserInfoAuthenticated, CodeRequestResponse, VerifyCodeResponse } from "synth.kitchen-shared";

import { User } from "../entity/User";
import { jwtSign } from "../utils/jwt-sign";

import { UserService } from "../services/user.service";
import { CodeService } from "../services/code.service";

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

  static requestCode = async (req, res) => {
    const email = req.body.email;

    if (!email || typeof email !== "string") {
      res.status(400).send("");
      return;
    }

    let echoCode: string | undefined;
    try {
      const result = await CodeService.requestCode(email);
      if (result && typeof result === "object") {
        echoCode = result.echoCode;
      }
    } catch (e) {
      console.error(e);
    }

    const response: CodeRequestResponse = {
      success: true,
      message: "If that email is valid, a sign-in code has been sent.",
    };
    res.status(200).json(echoCode ? { ...response, code: echoCode } : response);
  };

  static verifyCode = async (req, res) => {
    const email = req.body.email;
    const code = req.body.code;

    if (!email || typeof email !== "string" || !code || typeof code !== "string") {
      res.status(400).send("");
      return;
    }

    try {
      const result = await CodeService.verifyCode(email, code);
      if ("jwt" in result) {
        res.status(200).json({ jwt: result.jwt });
        return;
      }
      const response: VerifyCodeResponse = { error: result.error };
      res.status(400).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send("");
    }
  };

  static deleteUser = async (req: JwtRequest, res) => {
    try {
      const success = await UserService.deleteUser(req.auth.id);
      if (!success) {
        res.sendStatus(500);
        return;
      }

      res.status(200).json({ success });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };
}
