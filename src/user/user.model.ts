import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUserLean {
  name: string;
  address: string;
  email: string;
  password: string;
  photos: string[];
  creditCardType: string;
  creditCardNumber: string;
  creditCardName: string;
  creditCardExpiry: string;
  creditCardCvv: string;
  isDeleted: boolean;

  createdAt: string;
}

export type IUser = IUserLean & Document;

const UserSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String },
    address: { type: String },
    email: { type: String },
    password: { type: String },
    photos: { type: [String] },
    creditCardType: { type: String },
    creditCardNumber: { type: String },
    creditCardName: { type: String },
    creditCardExpiry: { type: String },
    creditCardCvv: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

interface UserInterface extends mongoose.Model<IUser> {}

export default mongoose.model<IUser, UserInterface>("User", UserSchema);
