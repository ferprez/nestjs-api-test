import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: false },
    imageUrl: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
  },
  {
    timestamps: true
  }
);

export interface User extends mongoose.Document {
  _id: string;
  uid: string;
  email: string;
  username: string;
  imageUrl: String;
  firstName: String;
  lastName: String;
}
