import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  // password?: string;
  googleId?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
});

export default mongoose.model<IUser>('User', userSchema);
