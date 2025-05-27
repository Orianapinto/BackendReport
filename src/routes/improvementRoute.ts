import express from "express";
import { 
    createImprovement, 
    getImprovements, 
    getImprovementById, 
    updateImprovement, 
    deleteImprovement 
} from "../controllers/improvementController";

const improvementRoute = express.Router();

// Rutas para mejoras (improvements)
// GET /api/improvements - Obtener todas las mejoras (con filtros opcionales)
improvementRoute.get("/", getImprovements);

// GET /api/improvements/:id - Obtener una mejora específica por ID
improvementRoute.get("/:id", getImprovementById);

// POST /api/improvements - Crear una nueva mejora
improvementRoute.post("/", createImprovement);

// PUT /api/improvements/:id - Actualizar una mejora existente
improvementRoute.put("/:id", updateImprovement);

// DELETE /api/improvements/:id - Eliminar una mejora
improvementRoute.delete("/:id", deleteImprovement);

export default improvementRoute;