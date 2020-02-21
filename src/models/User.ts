import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    required: true
  },
  token: String
});

export const User = mongoose.model("user", UserSchema);