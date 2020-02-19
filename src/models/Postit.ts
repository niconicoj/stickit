import mongoose from "mongoose";

const PostitSchema = new mongoose.Schema({
  folderId: String,
  userId: String,
  name: String,
  content: String
});

export const Postit = mongoose.model("Postit", PostitSchema);