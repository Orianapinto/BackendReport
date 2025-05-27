import express from "express";
import { 
    createWeeklyReport, 
    getWeeklyReports, 
    getWeeklyReportById, 
    updateWeeklyReport, 
    deleteWeeklyReport,
    consolidateWeeklyReport
} from "../controllers/weeklyController";

const weeklyRoute = express.Router();

// Rutas para reportes semanales
// GET /api/weekly - Obtener todos los reportes semanales (con filtros opcionales)
weeklyRoute.get("/", getWeeklyReports);

// GET /api/weekly/:id - Obtener un reporte semanal específico por ID
weeklyRoute.get("/:id", getWeeklyReportById);

// POST /api/weekly - Crear un nuevo reporte semanal
weeklyRoute.post("/", createWeeklyReport);

// PUT /api/weekly/:id - Actualizar un reporte semanal existente
weeklyRoute.put("/:id", updateWeeklyReport);

// DELETE /api/weekly/:id - Eliminar un reporte semanal
weeklyRoute.delete("/:id", deleteWeeklyReport);

// POST /api/weekly/:id/consolidate - Consolidar un reporte semanal
weeklyRoute.post("/:id/consolidate", consolidateWeeklyReport);

export default weeklyRoute;