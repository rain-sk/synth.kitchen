import express from "express";

import { Request as JwtRequest } from "express-jwt";
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../env";
import { jwt } from "../middleware/jwt";

export const TokenRouter = express.Router();

TokenRouter.get(`/`, async (req, res) => {
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
    const jwt = verify(token, jwtSecret);
    if (jwt) {
      res.status(200).send("OK");
      return;
    }
  } catch (e) {
    console.error(e);
  }
  res.status(401).send("Token Invalid or Expired");
});

TokenRouter.get(`/refresh`, jwt, async (req: JwtRequest, res) => {
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
    const jwt = verify(token, jwtSecret, {
      complete: true,
      ignoreExpiration: true,
    });
    if (jwt) {
      res.status(200).send("OK");
      return;
    }
  } catch (e) {
    console.error(e);
  }
  res.status(401).send("Token Invalid or Expired");
});
