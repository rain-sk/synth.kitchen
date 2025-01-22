import * as mongoose from "mongoose";
import { UserSchema } from "../../users/schemas/user.schema";

export const PatchSchema = new mongoose.Schema({
  id: String,
  name: String,
  patch: String,
  creator: UserSchema,
});
