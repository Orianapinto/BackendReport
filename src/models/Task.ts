import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  notes?: string; // Optional notes/considerations
  status: "Planned" | "In progress" | "Completed";
  type: "Development" | "Design" | "Support";
  client: Types.ObjectId;
  clientSlug: string;
  location: Types.ObjectId;
  locationSlug: string;
  assignedTo: string; // Changed to string for Clerk user ID
  dueDate: Date;
  completedDate?: Date;
  activity: {
    action: string;
    date: Date;
    user: string;
  }[];
  createdBy: string; // Clerk user ID
  updatedBy: string; // Clerk user ID
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    notes: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["Planned", "In progress", "Completed"],
      default: "Planned",
    },
    type: {
      type: String,
      required: true,
      enum: ["Development", "Design", "Support"],
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
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
    },
    // Para seguimiento de actividad
    activity: [
      {
        action: { type: String },
        date: { type: Date, default: Date.now },
        user: { type: String },
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema, "tasks");
