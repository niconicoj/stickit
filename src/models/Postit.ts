import mongoose, { MongooseDocument } from "mongoose";
import { Folder } from "./Folder";

const validateFolder = (v?: mongoose.Types.ObjectId) => {
  return new Promise<boolean>((resolve) => {
    if(v){
      Folder.findById(v, (err: Error, doc: MongooseDocument) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    } else {
      resolve(true);
    }
  })
}

const PostitSchema = new mongoose.Schema({
  folderId: {
    type: mongoose.Types.ObjectId || undefined,
    validate : {
      validator: (v?: mongoose.Types.ObjectId) => validateFolder(v),
      message: 'Parent folder not found.'
    },
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  }
});

export const Postit = mongoose.model("Postit", PostitSchema);