import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  location: "Venezuela" | "Florida" | "España" | "Panamá" | "Texas";
  category: "Desarrollo" | "Diseño" | "Soporte";
  taskRef: string;
  status: "Planned" | "In progress" | "Completed";
  completedDate: Date;
  createdBy?: string;
  updatedBy?: string;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: String,
      required: true,
      enum: ["Venezuela", "Florida", "España", "Panamá", "Texas"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Desarrollo", "Diseño", "Soporte"],
    },
    taskRef: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["Planned", "In progress", "Completed"],
      default: "Planned",
    },
    completedDate: {
      type: Date,
      required: true,
    },
    createdBy: { type: String   },
    updatedBy: { type: String   },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema, "tasks");
