import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  title : string,
  user: mongoose.Types.ObjectId;
  
}

const noteSchema = new Schema<INote>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: {type :String , required : true },

}, { timestamps: true });

export default mongoose.model<INote>("Note", noteSchema);