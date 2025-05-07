import mongoose, { Schema, Document } from "mongoose";

export interface IImprovement extends Document {
  title: string;
  description: string;
  status: "planned" | "in progress" | "completed";
  location: "Venezuela" | "Florida" | "España" | "Panamá" | "Texas";
  beforeImage?: string;
  afterImage?: string;
}

const ImprovementSchema = new Schema<IImprovement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["planned", "in progress", "completed"],
      default: "planned",
    },
    location: {
      type: String,
      required: true,
      enum: ["Venezuela", "Florida", "España", "Panamá", "Texas"],
    },
    beforeImage: { type: String },
    afterImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IImprovement>(
  "Improvement",
  ImprovementSchema,
  "improvements"
);
