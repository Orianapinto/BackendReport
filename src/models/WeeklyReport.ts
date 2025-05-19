import { Schema, model, Document, Types } from "mongoose";

export interface IWeeklyReport extends Document {
  slug: string;
  title: string;
  weekNumber: number;
  year: number;
  startDate: Date;
  endDate: Date;
  client: Types.ObjectId;
  clientSlug: string;
  location: Types.ObjectId;
  locationSlug: string;
  isConsolidated: boolean;
  completedTasks: Types.ObjectId[];
  pendingTasks: Types.ObjectId[];
  improvements: Types.ObjectId[];
  metrics: Types.ObjectId[];
  calculatedMetrics: {
    totalTasks: number;
    completedTasks: number;
    improvements: number;
  };
  notes: string;
  createdBy: string; // Clerk user ID
  updatedBy: string; // Clerk user ID
}

const WeeklyReportSchema = new Schema<IWeeklyReport>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    weekNumber: { type: Number, required: true },
    year: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
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
    isConsolidated: { type: Boolean, default: false },
    completedTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    pendingTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    improvements: [{ type: Schema.Types.ObjectId, ref: "Improvement" }],
    metrics: [{ type: Schema.Types.ObjectId, ref: "Metrics" }],
    calculatedMetrics: {
      totalTasks: { type: Number, default: 0 },
      completedTasks: { type: Number, default: 0 },
      improvements: { type: Number, default: 0 },
    },
    notes: { type: String },
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

export default model<IWeeklyReport>(
  "WeeklyReport",
  WeeklyReportSchema,
  "weeklyReports"
);
