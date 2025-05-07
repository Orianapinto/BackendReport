import express from "express";
import { createImprovement } from "../controllers/improvementController";

const improvementRoute = express.Router();

improvementRoute.post("/", createImprovement);

export default improvementRoute;
