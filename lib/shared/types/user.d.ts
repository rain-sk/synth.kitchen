import { PatchInfo } from "./patch";

export type UserInfo = {
  id: string;
  username: string;
};

export type UserPatchs = UserInfo & {
  patchs: PatchInfo[];
};

export type UserInfoAuthenticated = UserInfo & {
  verified: boolean;
  email: string;
};

export type AdminUser = UserInfoAuthenticated & {
  admin: true;
};
