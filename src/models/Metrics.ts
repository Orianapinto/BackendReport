import { Schema, model, Document, Types } from "mongoose";

export interface IMetrics extends Document {
  name: string;
  description: string;
  type: "Performance" | "Engagement" | "Conversion";
  value: number;
  client: Types.ObjectId;
  clientSlug: string;
  location: Types.ObjectId;
  locationSlug: string;
  date: Date;
  source: string;
  channel: string;
  metadata: Record<string, any>;
  createdBy: string;
  updatedBy: string;
}

const MetricsSchema = new Schema<IMetrics>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Performance", "Engagement", "Conversion"],
    },
    value: { type: Number, required: true },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    clientSlug: { type: String, required: true },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    locationSlug: { type: String, required: true },
    date: { type: Date, required: true },
    source: { type: String, required: true },
    channel: { type: String, required: true },
    metadata: { type: Map, of: Schema.Types.Mixed, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IMetrics>("Metrics", MetricsSchema, "metrics");
