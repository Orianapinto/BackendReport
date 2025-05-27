import { Request, Response } from "express";
import WeeklyReport from "../models/WeeklyReport";

/**
 * Controlador de Reportes Semanales
 * Maneja las operaciones CRUD y consolidación de reportes semanales
 */

/**
 * Crear nuevo reporte semanal
 * @param req.body Datos del reporte semanal
 * @param req.body.userId ID del usuario de Clerk que crea el reporte
 */
export const createWeeklyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReport = new WeeklyReport({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId,
    });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({
      message: "Error creating weekly report",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener todos los reportes semanales
 * @param req.query.client Filtrar por cliente
 * @param req.query.location Filtrar por ubicación
 * @param req.query.year Filtrar por año
 * @param req.query.weekNumber Filtrar por número de semana
 */
export const getWeeklyReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { client, location, year, weekNumber } = req.query;

    const filter: any = {};
    if (client) filter.client = client;
    if (location) filter.location = location;
    if (year) filter.year = parseInt(year as string);
    if (weekNumber) filter.weekNumber = parseInt(weekNumber as string);

    const reports = await WeeklyReport.find(filter)
      .populate("client", "name")
      .populate("location", "name")
      .populate({
        path: "tasks.task",
        model: "Task",
      })
      .populate("improvements")
      .populate("metrics")
      .sort({ year: -1, weekNumber: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching weekly reports",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener reporte semanal por ID
 * @param req.params.id ID del reporte a buscar
 */
export const getWeeklyReportById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await WeeklyReport.findById(req.params.id)
      .populate("client", "name")
      .populate("location", "name")
      .populate({
        path: "tasks.task",
        model: "Task",
      })
      .populate("improvements")
      .populate("metrics");

    if (!report) {
      res.status(404).json({ message: "Weekly report not found" });
      return;
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching weekly report",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Actualizar reporte semanal
 * @param req.params.id ID del reporte a actualizar
 * @param req.body Datos a actualizar
 * @param req.body.userId ID del usuario de Clerk que actualiza
 * @param req.body.nuevaObservacion Texto de la nueva observación a registrar (opcional)
 * @param req.body.nuevaActividad Texto de la nueva actividad a registrar (opcional)
 */
export const updateWeeklyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Primero obtenemos el reporte actual para acceder a los arrays existentes
    const currentReport = await WeeklyReport.findById(req.params.id);

    if (!currentReport) {
      res.status(404).json({ message: "Weekly report not found" });
      return;
    }

    // Preparamos los datos para la actualización
    const updateData = { ...req.body, updatedBy: req.body.userId };

    // Si se está enviando una nueva actividad
    if (req.body.nuevaActividad) {
      // Creamos el objeto de nueva actividad
      const nuevaActividad = {
        accion: req.body.nuevaActividad,
        fecha: new Date(),
        usuario: req.body.userId,
      };

      // Concatenamos el array existente con la nueva actividad
      updateData.actividad = [...currentReport.actividad, nuevaActividad];

      // Eliminamos el campo nuevaActividad para que no se guarde en la BD
      delete updateData.nuevaActividad;
    } else {
      // Si no se envía una nueva actividad, mantenemos el array existente
      updateData.actividad = currentReport.actividad;
    }

    // Si se está enviando una nueva observación
    if (req.body.nuevaObservacion) {
      // Creamos el objeto de nueva observación
      const nuevaObservacion = {
        descripcion: req.body.nuevaObservacion,
        fecha: new Date(),
        usuario: req.body.userId,
      };

      // Concatenamos el array existente con la nueva observación
      updateData.observaciones = [
        ...currentReport.observaciones,
        nuevaObservacion,
      ];

      // Eliminamos el campo nuevaObservacion para que no se guarde en la BD
      delete updateData.nuevaObservacion;
    } else {
      // Si no se envía una nueva observación, mantenemos el array existente
      updateData.observaciones = currentReport.observaciones;
    }

    const updatedReport = await WeeklyReport.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate([
      "client",
      "location",
      {
        path: "tasks.task",
        model: "Task",
      },
      "improvements",
      "metrics",
    ]);

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({
      message: "Error updating weekly report",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Eliminar reporte semanal
 * @param req.params.id ID del reporte a eliminar
 */
export const deleteWeeklyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedReport = await WeeklyReport.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      res.status(404).json({ message: "Weekly report not found" });
      return;
    }

    res.status(200).json({ message: "Weekly report deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting weekly report",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Consolidar reporte semanal
 * Calcula métricas totales y actualiza estado
 * @param req.params.id ID del reporte a consolidar
 */
export const consolidateWeeklyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await WeeklyReport.findById(req.params.id)
      .populate({
        path: "tasks.task",
        model: "Task",
      })
      .populate("improvements");

    if (!report) {
      res.status(404).json({ message: "Weekly report not found" });
      return;
    }

    // Calcular métricas
    const completedTasks = report.tasks.filter(
      (t) => t.status === "Completed"
    ).length;

    report.isConsolidated = true;
    report.calculatedMetrics = {
      totalTasks: report.tasks.length,
      completedTasks: completedTasks,
      improvements: report.improvements.length,
    };

    // Registrar actividad de consolidación
    report.actividad.push({
      accion: "Reporte consolidado",
      fecha: new Date(),
      usuario: req.body.userId,
    });

    report.updatedBy = req.body.userId;

    await report.save();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Error consolidating weekly report",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
