import { Request, Response } from "express";
import Metrics from "../models/Metrics";

/**
 * Controlador de Métricas
 * Maneja las operaciones CRUD para las métricas de rendimiento, engagement y conversión
 * por cliente y ubicación
 */

/**
 * Crear nuevas métricas
 * @param req.body Datos de las métricas a crear
 * @param req.body.userId ID del usuario de Clerk que crea las métricas
 * @returns Métricas creadas
 */
export const createMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newMetrics = new Metrics({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId,
    });
    const savedMetrics = await newMetrics.save();
    res.status(201).json(savedMetrics);
  } catch (error) {
    res.status(500).json({
      message: "Error creating metrics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener todas las métricas
 * @param req.query.client Filtrar por cliente
 * @param req.query.location Filtrar por ubicación
 * @param req.query.type Filtrar por tipo de métrica
 * @param req.query.startDate Fecha inicial para filtrar
 * @param req.query.endDate Fecha final para filtrar
 * @returns Lista de métricas que coinciden con los filtros
 */
export const getMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { client, location, type, startDate, endDate } = req.query;

    // Construir filtros dinámicamente
    const filter: any = {};
    if (client) filter.client = client;
    if (location) filter.location = location;
    if (type) filter.type = type;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate as string);
      if (endDate) filter.date.$lte = new Date(endDate as string);
    }

    const metrics = await Metrics.find(filter)
      .populate("client", "name")
      .populate("location", "name")
      .sort({ date: -1 });

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching metrics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Obtener Métricas por ID
export const getMetricsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const metrics = await Metrics.findById(req.params.id)
      .populate("client", "name")
      .populate("location", "name");

    if (!metrics) {
      res.status(404).json({ message: "Metrics not found" });
      return;
    }

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching metrics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Actualizar Métricas
export const updateMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedMetrics = await Metrics.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.body.userId,
      },
      { new: true }
    );

    if (!updatedMetrics) {
      res.status(404).json({ message: "Metrics not found" });
      return;
    }

    res.status(200).json(updatedMetrics);
  } catch (error) {
    res.status(500).json({
      message: "Error updating metrics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Eliminar Métricas
export const deleteMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedMetrics = await Metrics.findByIdAndDelete(req.params.id);

    if (!deletedMetrics) {
      res.status(404).json({ message: "Metrics not found" });
      return;
    }

    res.status(200).json({ message: "Metrics deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting metrics",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
