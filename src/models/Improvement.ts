import { Schema, model, Document, Types } from "mongoose";

export interface IImprovement extends Document {
  title: string;
  description: string;
  status: "Planned" | "In progress" | "Completed";
  type: "Process" | "Technical" | "Other";
  client: Types.ObjectId;
  clientSlug: string;
  location: Types.ObjectId;
  locationSlug: string;
  implementedBy: string; // Clerk user ID
  implementationDate: Date;
  actividad: {
    accion: string;
    fecha: Date;
    usuario: string;
  }[];
  createdBy: string; // Clerk user ID
  updatedBy: string; // Clerk user ID
}

const ImprovementSchema = new Schema<IImprovement>(
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
      enum: ["Process", "Technical", "Other"],
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
    implementedBy: {
      type: String,
      required: true,
    },
    implementationDate: {
      type: Date,
      required: true,
    },
    // Para seguimiento de actividad
    actividad: [{
        accion: { type: String },
        fecha: { type: Date, default: Date.now },
        usuario: { type: String }
    }],
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

export default model<IImprovement>(
  "Improvement",
  ImprovementSchema,
  "improvements"
);
