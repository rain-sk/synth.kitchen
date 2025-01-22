import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  name: String,
  passwordHash: String,
});
