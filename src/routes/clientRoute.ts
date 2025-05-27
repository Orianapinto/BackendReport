import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

const clientRoute = express.Router();

// GET /api/clients - Get all clients
clientRoute.get("/", getClients);

// GET /api/clients/:id - Get client by ID
clientRoute.get("/:id", getClientById);

// POST /api/clients - Create new client
clientRoute.post("/", createClient);

// PUT /api/clients/:id - Update client
clientRoute.put("/:id", updateClient);

// DELETE /api/clients/:id - Deactivate client
clientRoute.delete("/:id", deleteClient);

export default clientRoute;
