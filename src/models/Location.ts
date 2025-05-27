import { Schema, model, Document, Types } from "mongoose";

export interface ILocation extends Document {
  name: string;
  country: string;
  city: string;
  address: string;
  client: Types.ObjectId;
  clientSlug: string;
  active: boolean;
  createdBy: string; // Clerk user ID
  updatedBy: string; // Clerk user ID
}

const LocationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    clientSlug: {
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

export default model<ILocation>("Location", LocationSchema, "locations");
