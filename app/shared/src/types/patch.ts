import { Sample } from "./sample";
import { UserInfo } from "./user";

export type PatchQuery =
  | {
      id: string;
      slug?: never;
    }
  | { id?: never; slug: string };

export type PatchInfo = {
  id: string;
  name: string;
  slug: string;
  creator: UserInfo;
};

export type Patch = PatchInfo & {
  data: string;
};
