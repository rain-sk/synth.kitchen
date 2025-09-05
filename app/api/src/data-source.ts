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

import { InitialSchema1750101797340 } from "./migration/1750101797340-InitialSchema";
import { SeedAdmin1750101797341 } from "./migration/1750101797341-SeedAdmin";
import { RenameChefToCreator1754401246115 } from "./migration/1754401246115-RenameChefToCreator";
import { AddSlugToPatch1754401685802 } from "./migration/1754401685802-AddSlugToPatch";
import { DefaultPublicTrue1754558730988 } from "./migration/1754558730988-DefaultPublicTrue";
import { Samples1754999099521 } from "./migration/1754999099521-Samples";
import { PatchState1757113659573 } from "./migration/1757113659573-PatchState";
import { SeedPatches1757411092846 } from "./migration/1757411092846-SeedPatches";
import { UniqueUsername1757491678616 } from "./migration/1757491678616-UniqueUsername";
import { ConsistentCreatedAtColumnName1757511544274 } from "./migration/1757511544274-NewMigration";

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
    InitialSchema1750101797340,
    SeedAdmin1750101797341,
    RenameChefToCreator1754401246115,
    AddSlugToPatch1754401685802,
    DefaultPublicTrue1754558730988,
    Samples1754999099521,
    PatchState1757113659573,
    SeedPatches1757411092846,
    UniqueUsername1757491678616,
    ConsistentCreatedAtColumnName1757511544274,
  ],
  logging,
});
