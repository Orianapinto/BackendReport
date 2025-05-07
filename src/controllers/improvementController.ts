import { request, response } from "express";
import Improvement, { IImprovement } from "../models/Improvement";

const createImprovement = async (req = request, res = response) => {
  try {
    const newImprovement = new Improvement(req.body);
    const savedImprovement = await newImprovement.save();
    res.status(201).json(savedImprovement);
  } catch (error) {
    console.error("Error creating improvement:", error);
    res.status(500).json({ message: "Error creating improvement", error });
  }
};

export { createImprovement };
