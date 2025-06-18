import { sign } from "jsonwebtoken";

import { jwtSecret } from "../env";

export const jwtSign = async (data: object) => {
  return await sign(data, jwtSecret);
};
