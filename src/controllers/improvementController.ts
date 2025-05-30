import { Request, Response } from "express";
import Improvement from "../models/Improvement";

/**
 * Controlador de Mejoras (Improvements)
 * Maneja las operaciones CRUD para las mejoras implementadas en diferentes ubicaciones
 */

/**
 * Crear una nueva mejora
 * @param req.body Contiene los datos de la mejora a crear
 * @param req.body.userId ID del usuario de Clerk que crea la mejora
 * @returns Nueva mejora creada
 */

export const createImprovement = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newImprovement = new Improvement({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId,
    });
    const savedImprovement = await newImprovement.save();
    res.status(201).json(savedImprovement);
  } catch (error) {
    res.status(500).json({
      message: "Error creating improvement",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener todas las mejoras
 * @param req.query.client Filtrar por cliente
 * @param req.query.location Filtrar por ubicación
 * @param req.query.type Filtrar por tipo de mejora
 * @returns Lista de mejoras que coinciden con los filtros
 */
export const getImprovements = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { client, location, type } = req.query;
    // Construir filtros dinámicamente
    const filter: any = {};
    if (client) filter.client = client;
    if (location) filter.location = location;
    if (type) filter.type = type;

    const improvements = await Improvement.find(filter)
      .populate("client", "name")
      .populate("location", "name")
      .sort({ implementationDate: -1 });

    res.status(200).json(improvements);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching improvements",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener una mejora por su ID
 * @param req.params.id ID de la mejora a buscar
 * @returns Mejora encontrada o error 404 si no existe
 */
export const getImprovementById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const improvement = await Improvement.findById(req.params.id)
      .populate("client", "name")
      .populate("location", "name");

    if (!improvement) {
      res.status(404).json({ message: "Improvement not found" });
      return;
    }

    res.status(200).json(improvement);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching improvement",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Actualizar Mejoras
export const updateImprovement = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Primero obtenemos la mejora actual para acceder al array de actividades existente
    const currentImprovement = await Improvement.findById(req.params.id);

    if (!currentImprovement) {
      res.status(404).json({ message: "Improvement not found" });
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
        usuario: req.body.userId
      };
      
      // Concatenamos el array existente con la nueva actividad
      updateData.actividad = [...currentImprovement.actividad, nuevaActividad];

       // Eliminamos el campo nuevaActividad para que no se guarde en la BD
      delete updateData.nuevaActividad;
    } else {
      // Si no se envía una nueva actividad, mantenemos el array existente
      // para evitar sobreescribirlo con un valor undefined
      updateData.actividad = currentImprovement.actividad;
    }

    // Actualizamos la mejora con los nuevos datos
    const updatedImprovement = await Improvement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedImprovement);
  } catch (error) {
    res.status(500).json({
      message: "Error updating improvement",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Eliminar Mejoras
export const deleteImprovement = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedImprovement = await Improvement.findByIdAndDelete(
      req.params.id
    );

    if (!deletedImprovement) {
      res.status(404).json({ message: "Improvement not found" });
      return;
    }

    res.status(200).json({ message: "Improvement deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting improvement",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
