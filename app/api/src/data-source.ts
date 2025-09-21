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

import { EmailVerificationRequest } from "./entity/EmailVerificationRequest";
import { PasswordResetRequest } from "./entity/PasswordResetRequest";
import { Patch } from "./entity/Patch";
import { Sample } from "./entity/Sample";
import { SavedPatchState } from "./entity/SavedPatchState";
import { User } from "./entity/User";

import { InitialSchema1758462191839 } from "./migration/1758462191839-InitialSchema";
import { SeedAdmin1758462225132 } from "./migration/1758462225132-SeedAdmin";
import { SeedPatches1758462320300 } from "./migration/1758462320300-SeedPatches";

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
    SavedPatchState,
    EmailVerificationRequest,
    PasswordResetRequest,
    Sample,
  ],
  migrations: [
    InitialSchema1758462191839,
    SeedAdmin1758462225132,
    SeedPatches1758462320300,
  ],
  logging,
});
