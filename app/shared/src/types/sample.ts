import { PatchInfo } from "./patch";

export type SampleQuery = {
  id: string;
};

export type SampleInfo = {
  id: string;
  name: string;
};

export type Sample = SampleInfo & {
  data: string;
  patches: PatchInfo[];
};
