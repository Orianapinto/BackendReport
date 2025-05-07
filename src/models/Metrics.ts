import { Schema, model, Document, Types } from "mongoose";

export interface IMetrics extends Document {
  location: "Venezuela" | "Florida" | "Spain" | "Panama" | "Texas";
  activeUsers: number;
  conversions: number;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

const MetricsSchema = new Schema<IMetrics>(
  {
    location: {
      type: String,
      required: true,
      enum: ["Venezuela", "Florida", "Spain", "Panama", "Texas"],
    },
    activeUsers: { type: Number, required: true },
    conversions: { type: Number, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IMetrics>("Metrics", MetricsSchema, "metrics");
