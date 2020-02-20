import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
  googleSub: String
});

export const User = mongoose.model("user", UserSchema);