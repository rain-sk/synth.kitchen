import { Document } from "mongoose";

export interface Patch extends Document {
  readonly id: string;
  readonly name: string;
  readonly patch: string;
  readonly creator: any;
}
