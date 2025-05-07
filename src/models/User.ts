import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  location: "Venezuela" | "Florida" | "Spain" | "Panama" | "Texas";
  role: "admin" | "user";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: String,
      required: true,
      enum: ["Venezuela", "Florida", "Spain", "Panama", "Texas"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);
const User = model<IUser>("User", UserSchema);

export default User;
