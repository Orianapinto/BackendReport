import { Schema, model, Document, Types } from "mongoose";

export interface IClient extends Document {
  name: string;
  slug: string;
  email: string;
  phone: string;
  contactPerson: string;
  description?: string; // Optional description
  notes?: string; // Optional notes/considerations
  locations: Types.ObjectId[];
  address: string;
  active: boolean;
  createdBy: string; // Clerk user ID
  updatedBy: string; // Clerk user ID
}

const ClientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    address: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IClient>("Client", ClientSchema, "clients");
