import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import type { AdminUser, UserInfoAuthenticated } from "synth.kitchen-shared";

import { User } from "../entity/User";

import { jwtSecret } from "../env";

export const jwtSign = async (user: JwtPayload | User) => {
  const data: UserInfoAuthenticated | AdminUser = user.admin
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
      };
  return await jsonwebtoken.sign(data, jwtSecret, { expiresIn: "1d" });
};
