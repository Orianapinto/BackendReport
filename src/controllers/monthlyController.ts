import { Request, Response } from "express";
import MonthlyReport from "../models/MonthlyReport";

/**
 * Controlador de Reportes Mensuales
 * Maneja las operaciones CRUD y consolidación de reportes mensuales
 */

/**
 * Crear nuevo reporte mensual
 * @param req.body Datos del reporte mensual
 * @param req.body.userId ID del usuario de Clerk
 */
export const createMonthlyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReport = new MonthlyReport({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId,
    });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el reporte mensual",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtener todos los reportes mensuales
 * @param req.query Filtros opcionales (cliente, ubicación, año, mes)
 */
export const getMonthlyReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { client, location, year, month } = req.query;

    const filter: any = {};
    if (client) filter.client = client;
    if (location) filter.location = location;
    if (year) filter.year = parseInt(year as string);
    if (month) filter.month = parseInt(month as string);

    const reports = await MonthlyReport.find(filter)
      .populate("client", "name")
      .populate("location", "name")
      .populate({
        path: "weeklyReports",
        populate: ["completedTasks", "pendingTasks", "improvements", "metrics"],
      })
      .sort({ year: -1, month: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los reportes mensuales",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtener reporte mensual por ID
 * @param req.params.id ID del reporte a buscar
 */
export const getMonthlyReportById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await MonthlyReport.findById(req.params.id)
      .populate("client", "name")
      .populate("location", "name")
      .populate({
        path: "weeklyReports",
        populate: ["completedTasks", "pendingTasks", "improvements", "metrics"],
      });

    if (!report) {
      res.status(404).json({ message: "Reporte mensual no encontrado" });
      return;
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el reporte mensual",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Actualizar reporte mensual
 * @param req.params.id ID del reporte a actualizar
 * @param req.body Datos a actualizar
 */
export const updateMonthlyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedReport = await MonthlyReport.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.body.userId,
      },
      { new: true }
    ).populate("client location weeklyReports");

    if (!updatedReport) {
      res.status(404).json({ message: "Reporte mensual no encontrado" });
      return;
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el reporte mensual",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Eliminar reporte mensual
 * @param req.params.id ID del reporte a eliminar
 */
export const deleteMonthlyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedReport = await MonthlyReport.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      res.status(404).json({ message: "Reporte mensual no encontrado" });
      return;
    }

    res.status(200).json({ message: "Reporte mensual eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el reporte mensual",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Consolidar reporte mensual
 * Calcula métricas totales y actualiza estado
 * @param req.params.id ID del reporte a consolidar
 */
export const consolidateMonthlyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await MonthlyReport.findById(req.params.id).populate({
      path: "weeklyReports",
      populate: ["completedTasks", "pendingTasks", "improvements", "metrics"],
    });

    if (!report) {
      res.status(404).json({ message: "Reporte mensual no encontrado" });
      return;
    }

    report.isConsolidated = true;
    report.updatedBy = req.body.userId;
    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Error al consolidar el reporte mensual",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
