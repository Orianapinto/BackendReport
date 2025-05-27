import express from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController";

const locationRoute = express.Router();

// GET /api/locations - Get all locations
locationRoute.get("/", getLocations);

// GET /api/locations/:id - Get location by ID
locationRoute.get("/:id", getLocationById);

// POST /api/locations - Create new location
locationRoute.post("/", createLocation);

// PUT /api/locations/:id - Update location
locationRoute.put("/:id", updateLocation);

// DELETE /api/locations/:id - Deactivate location
locationRoute.delete("/:id", deleteLocation);

export default locationRoute;
