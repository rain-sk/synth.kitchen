import { DataSource } from "typeorm";
import "reflect-metadata";

import {
  dbLogging as logging,
  pgDbName as database,
  pgHost as host,
  pgPassword as password,
  pgPort as port,
  pgUser as username,
} from "./env";

import { User } from "./entity/User";
import { Patch } from "./entity/Patch";
import { PasswordResetRequest } from "./entity/PasswordResetRequest";
import { EmailVerificationRequest } from "./entity/EmailVerificationRequest";

import { InitialSchema1750101797340 } from "./migration/1750101797340-InitialSchema";
import { SeedAdmin1750101797341 } from "./migration/1750101797341-SeedAdmin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  entities: [User, Patch, EmailVerificationRequest, PasswordResetRequest],
  migrations: [InitialSchema1750101797340, SeedAdmin1750101797341],
  logging,
});
