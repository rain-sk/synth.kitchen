import { UserInfo } from "./user";

export type PatchQuery =
  | {
      id: string;
      slug?: never;
      creatorId?: never;
    }
  | { id?: never; slug: string; creatorId?: never }
  | { id?: never; slug?: never; creatorId: string };

export type PatchInfo = {
  id: string;
  name: string;
  slug: string;
  creator: UserInfo;
};

export type Patch = PatchInfo & {
  data: string;
};
