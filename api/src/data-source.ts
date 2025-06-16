import "reflect-metadata";
import { DataSource } from "typeorm";

import { pgDbName, pgHost, pgPassword, pgPort, pgUser } from "./env";

import { User } from "./entity/User";
import { Recipe } from "./entity/Recipe";
import { PasswordResetRequest } from "./entity/PasswordResetRequest";
import { EmailVerificationRequest } from "./entity/EmailVerificationRequest";

import { InitialSchema1750101797340 } from "./migration/1750101797340-InitialSchema";
import { SeedAdmin1750101797341 } from "./migration/1750101797341-SeedAdmin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: pgHost,
  port: parseInt(pgPort || "") || 5432,
  username: pgUser,
  password: pgPassword,
  database: pgDbName,
  entities: [User, Recipe, EmailVerificationRequest, PasswordResetRequest],
  migrations: [InitialSchema1750101797340, SeedAdmin1750101797341],
  logging: true,
});
