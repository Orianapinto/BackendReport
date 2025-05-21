import express from "express";
import { 
    createMetrics, 
    getMetrics, 
    getMetricsById, 
    updateMetrics, 
    deleteMetrics 
} from "../controllers/metricsController";

const metricsRoute = express.Router();

// Rutas para métricas
// GET /api/metrics - Obtener todas las métricas (con filtros opcionales)
metricsRoute.get("/", getMetrics);

// GET /api/metrics/:id - Obtener una métrica específica por ID
metricsRoute.get("/:id", getMetricsById);

// POST /api/metrics - Crear nuevas métricas
metricsRoute.post("/", createMetrics);

// PUT /api/metrics/:id - Actualizar métricas existentes
metricsRoute.put("/:id", updateMetrics);

// DELETE /api/metrics/:id - Eliminar métricas
metricsRoute.delete("/:id", deleteMetrics);

export default metricsRoute;