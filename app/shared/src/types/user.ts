import { PatchInfo } from "./patch";

export type UserInfo = {
  id: string;
  username: string | null;
};

export type PublicCreator = {
  id: string;
};

export type UserPatches = UserInfo & {
  patches: PatchInfo[];
};

export type UserInfoAuthenticated = UserInfo & {
  verified: boolean;
  email: string;
};

export type AdminUser = UserInfoAuthenticated & {
  admin: true;
};
