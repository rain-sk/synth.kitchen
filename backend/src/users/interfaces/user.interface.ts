import { Document } from "mongoose";

export interface User extends Document {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly passwordHash: string;
}
