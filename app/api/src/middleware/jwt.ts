import { expressjwt } from "express-jwt";

import { jwtSecret } from "../env";

export const jwt = expressjwt({
  secret: jwtSecret,
  algorithms: ["HS256"],
  maxAge: "1y",
});
