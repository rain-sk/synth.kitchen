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
import { Sample } from "./entity/Sample";
import { PasswordResetRequest } from "./entity/PasswordResetRequest";
import { EmailVerificationRequest } from "./entity/EmailVerificationRequest";

import { InitialSchema1757636379847 } from "./migration/1757636379847-InitialSchema";
import { SeedAdmin1757636427396 } from "./migration/1757636427396-SeedAdmin";
import { SeedPatches1757636495393 } from "./migration/1757636495393-SeedPatches";

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  entities: [
    User,
    Patch,
    EmailVerificationRequest,
    PasswordResetRequest,
    Sample,
  ],
  migrations: [
    InitialSchema1757636379847,
    SeedAdmin1757636427396,
    SeedPatches1757636495393,
  ],
  logging,
});
