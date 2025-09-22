import { Request as JwtRequest } from "express-jwt";
import jsonwebtoken from "jsonwebtoken";

import { jwtSign } from "../utils/jwt-sign";

import { jwtSecret } from "../env";

export class TokenController {
  static checkToken = async (req: JwtRequest, res) => {
    if (req.auth) {
      res.status(200).send("OK");
    } else {
      res.status(401).json({ err: "unauthorized" });
    }
  };

  static refreshToken = async (req: JwtRequest, res) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401).send("Missing authorization header.");
      return;
    }

    const token = authorization.split("Bearer ")[1];
    if (!token) {
      res.status(401).send("Malformed authorization header.");
    }

    try {
      const jwt = jsonwebtoken.verify(token, jwtSecret, {
        algorithms: ["HS256"],
        complete: true,
      }).signature;
      if (jwt) {
        res.status(200).json({ jwt: token });
        return;
      }
    } catch (e) {
      console.error(e);
    }

    try {
      const jwt = jsonwebtoken.verify(token, jwtSecret, {
        algorithms: ["HS256"],
        complete: true,
        ignoreExpiration: true,
      });
      let signature = jwt.signature;
      if (signature && typeof jwt.payload === "object") {
        delete jwt.payload.exp;
        delete jwt.payload.iat;
        signature = await jwtSign(jwt.payload);
        res.status(200).json({ jwt: signature });
        return;
      }
    } catch (e) {
      console.error(e);
    }
    res.status(401).send("Token Invalid or Expired");
  };
}
