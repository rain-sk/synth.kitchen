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

import { AppInfo } from "./entity/AppInfo";
import { EmailVerificationRequest } from "./entity/EmailVerificationRequest";
import { PasswordResetRequest } from "./entity/PasswordResetRequest";
import { Patch } from "./entity/Patch";
import { Sample } from "./entity/Sample";
import { SavedPatchState } from "./entity/SavedPatchState";
import { User } from "./entity/User";

import { InitialSchema1758462191839 } from "./migration/1758462191839-InitialSchema";
import { SeedAdmin1758462225132 } from "./migration/1758462225132-SeedAdmin";
import { SeedPatches1758462320300 } from "./migration/1758462320300-SeedPatches";
import { RemoveNeedsUpgradeColumn1759697039708 } from "./migration/1759697039708-RemoveNeedsUpgradeColumn";
import { AppInfo1761908857941 } from "./migration/1761908857941-AppInfo";
import { v0_5_11_1762583925581 } from "./migration/1762583925581-v0.5.11";

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  entities: [
    AppInfo,
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
    RemoveNeedsUpgradeColumn1759697039708,
    AppInfo1761908857941,
    v0_5_11_1762583925581,
  ],
  logging,
});
