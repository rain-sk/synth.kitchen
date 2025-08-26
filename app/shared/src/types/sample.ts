export type SampleQuery =
  | {
      id: string;
      slug?: never;
    }
  | { id?: never; slug: string };

export type SampleInfo = {
  id: string;
  name: string;
};

export type Sample = SampleInfo & {
  data: Buffer;
};
