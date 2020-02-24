import mongoose, { MongooseDocument } from "mongoose";

const validateParent = (v?: mongoose.Types.ObjectId) => {
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
    type: mongoose.Types.ObjectId || undefined,
    validate : {
      validator: (v?: mongoose.Types.ObjectId) => validateParent(v),
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