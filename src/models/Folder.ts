import mongoose, { MongooseDocument } from "mongoose";

const validateParent = (v?: String) => {
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

const FolderSchema = new mongoose.Schema({
  parentId: {
    type: String || undefined,
    validate : {
      validator: (v?: String) => validateParent(v),
      message: 'Parent folder not found.'
    },
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const Folder = mongoose.model("folder", FolderSchema);