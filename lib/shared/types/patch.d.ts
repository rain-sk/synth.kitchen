import { UserInfo } from "./user";

export type PatchInfo = {
  id: string;
  name: string;
  chef: UserInfo;
};

export type Patch = PatchInfo & {
  data: string;
};
