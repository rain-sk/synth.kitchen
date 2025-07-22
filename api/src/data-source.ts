import { DataSource } from "typeorm";
import "reflect-metadata";

import { pgDbName, pgHost, pgPassword, pgPort, pgUser } from "./env";

import { User } from "./entity/User";
import { Patch } from "./entity/Patch";
import { PasswordResetRequest } from "./entity/PasswordResetRequest";
import { EmailVerificationRequest } from "./entity/EmailVerificationRequest";

import { InitialSchema1750101797340 } from "./migration/1750101797340-InitialSchema";
import { SeedAdmin1750101797341 } from "./migration/1750101797341-SeedAdmin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: pgHost,
  port: pgPort,
  username: pgUser,
  password: pgPassword,
  database: pgDbName,
  entities: [User, Patch, EmailVerificationRequest, PasswordResetRequest],
  migrations: [InitialSchema1750101797340, SeedAdmin1750101797341],
  logging: true,
});
