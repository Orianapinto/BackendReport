import { Schema, model, Document, Types } from "mongoose";

interface ICalculatedMetrics {
  totalTasks: number;
  completedTasks: number;
  improvements: number;
  metrics: {
    performance: number;
    engagement: number;
    conversion: number;
  };
}

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
  slug: string;
  title: string;
  month: number;
  year: number;
  client: Types.ObjectId;
  clientSlug: string;
  location: Types.ObjectId;
  locationSlug: string;
  isConsolidated: boolean;
  weeklyReports: Types.ObjectId[];
  metrics: Types.ObjectId[];
  calculatedMetrics: ICalculatedMetrics;
  performanceSummary: string;
  nextMonthGoals: string;
  createdBy: string; // Clerk user ID
  updatedBy: string; // Clerk user ID
  totalTasksByLocation: IMapOfNumbers;
  totalImprovementsByLocation: IMapOfNumbers;
  averageMetricsByLocation: IMapOfMetrics;
}

const MonthlyReportSchema = new Schema<IMonthlyReport>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
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
    weeklyReports: [{ type: Schema.Types.ObjectId, ref: "WeeklyReport" }],
    metrics: [{ type: Schema.Types.ObjectId, ref: "Metrics" }],
    calculatedMetrics: {
      totalTasks: { type: Number, default: 0 },
      completedTasks: { type: Number, default: 0 },
      improvements: { type: Number, default: 0 },
      metrics: {
        performance: { type: Number, default: 0 },
        engagement: { type: Number, default: 0 },
        conversion: { type: Number, default: 0 },
      },
    },
    performanceSummary: { type: String, required: true },
    nextMonthGoals: { type: String, required: true },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
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
