import express from "express";
import { 
    createMonthlyReport, 
    getMonthlyReports, 
    getMonthlyReportById, 
    updateMonthlyReport, 
    deleteMonthlyReport,
    consolidateMonthlyReport
} from "../controllers/monthlyController";

const monthlyRoute = express.Router();

// Rutas para reportes mensuales
// GET /api/monthly - Obtener todos los reportes mensuales (con filtros opcionales)
monthlyRoute.get("/", getMonthlyReports);

// GET /api/monthly/:id - Obtener un reporte mensual específico por ID
monthlyRoute.get("/:id", getMonthlyReportById);

// POST /api/monthly - Crear un nuevo reporte mensual
monthlyRoute.post("/", createMonthlyReport);

// PUT /api/monthly/:id - Actualizar un reporte mensual existente
monthlyRoute.put("/:id", updateMonthlyReport);

// DELETE /api/monthly/:id - Eliminar un reporte mensual
monthlyRoute.delete("/:id", deleteMonthlyReport);

// POST /api/monthly/:id/consolidate - Consolidar un reporte mensual
monthlyRoute.post("/:id/consolidate", consolidateMonthlyReport);

export default monthlyRoute;