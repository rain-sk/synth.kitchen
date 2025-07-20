import jsonwebtoken from "jsonwebtoken";

import { jwtSecret } from "../env";

export const jwtSign = async (data: object) => {
  return await jsonwebtoken.sign(data, jwtSecret, { expiresIn: "1m" });
};
