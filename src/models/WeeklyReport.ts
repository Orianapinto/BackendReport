import { Schema, model, Document, Types } from "mongoose";

export interface IWeeklyReport extends Document {
  date: Date;
  week: number;
  month: number;
  year: number;
  completedTasks: Types.ObjectId[];
  improvements: Types.ObjectId[];
  metrics: Types.ObjectId[];
  comments?: string[];
  NextSteps?: string[];
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

const WeeklyReportSchema = new Schema<IWeeklyReport>(
  {
    date: { type: Date, required: true },
    week: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    completedTasks: [{ type: Types.ObjectId, ref: "Task" }],
    improvements: [{ type: Types.ObjectId, ref: "Task" }],
    metrics: [{ type: Types.ObjectId, ref: "Metrics" }],
    comments: [{ type: String }],
    NextSteps: [{ type: String }],
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
export default model<IWeeklyReport>(
  "WeeklyReport",
  WeeklyReportSchema,
  "weeklyReports"
);
