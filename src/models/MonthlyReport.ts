import { Schema, model, Document, Types } from "mongoose";

interface IMapOfNumbers {
  [location: string]: number;
}
interface IMapOfMetrics {
  [location: string]: {
    activeUsers: number;
    conversions?: number;
  };
}
export interface IMonthlyReport extends Document {
  month: string;
  year: number;
  reports: Types.ObjectId[];
  totalTasksByLocation: IMapOfNumbers;
  totalImprovementsByLocation: IMapOfNumbers;
  averageMetricsByLocation: IMapOfMetrics;
}

const MonthlyReportSchema = new Schema<IMonthlyReport>(
  {
    month: { type: String, required: true },
    year: { type: Number, required: true },
    reports: [{ type: Schema.Types.ObjectId, ref: "WeeklyReport" }],
    totalTasksByLocation: { type: Map, of: Number },
    totalImprovementsByLocation: { type: Map, of: Number },
    averageMetricsByLocation: {
      type: Map,
      of: new Schema(
        {
          activeUsers: { type: Number, required: true },
          conversions: { type: Number },
        },
        { _id: false }
      ),
    },
  },
  { timestamps: true }
);

export default model<IMonthlyReport>(
  "MonthlyReport",
  MonthlyReportSchema,
  "monthlyReports"
);
