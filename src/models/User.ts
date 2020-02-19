import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

export const User = mongoose.model("Postit", UserSchema);