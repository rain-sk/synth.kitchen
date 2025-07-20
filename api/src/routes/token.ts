import express from "express";

import { Request as JwtRequest } from "express-jwt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from "../env";
import { jwtSign } from "../utils/jwtSign";

export const TokenRouter = express.Router();

TokenRouter.get(`/`, async (req: JwtRequest, res) => {
  if (req.auth) {
    res.status(200).send("OK");
    return;
  }
});

TokenRouter.get(`/refresh`, async (req: JwtRequest, res) => {
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
    let jwt = jsonwebtoken.verify(token, jwtSecret, {
      complete: true,
      ignoreExpiration: true,
    }).signature;
    if (jwt) {
      jwt = await jwtSign(req.auth);
      res.status(200).json({ jwt });
      return;
    }
  } catch (e) {
    console.error(e);
  }
  res.status(401).send("Token Invalid or Expired");
});
