import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "Planned" | "In progress" | "Completed";
  type: "Desarrollo" | "Diseño" | "Soporte";
  client: Types.ObjectId;
  clientSlug: string;
  location: Types.ObjectId;
  locationSlug: string;
  assignedTo: Types.ObjectId;
  dueDate: Date;
  completedDate?: Date;
  createdBy?: string;
  updatedBy?: string;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Planned", "In progress", "Completed"],
      default: "Planned",
    },
    type: {
      type: String,
      required: true,
      enum: ["Desarrollo", "Diseño", "Soporte"],
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
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    locationSlug: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
    },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema, "tasks");
