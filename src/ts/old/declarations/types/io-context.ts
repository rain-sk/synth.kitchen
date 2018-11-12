import { IOType } from "..";

export type IOContext = [
  boolean,              // is the context active?
  string | undefined,   // the ID of the active node
  IOType | undefined    // the type of the active node
];