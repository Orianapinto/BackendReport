import { Request, Response } from "express";
import Location from "../models/Location";

/**
 * Controlador de Ubicaciones
 * Gestiona las ubicaciones asociadas a clientes y sus métricas
 */

/**
 * Crear nueva ubicación
 * @param req.body.client ID del cliente asociado
 */
export const createLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newLocation = new Location({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId,
    });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).json({
      message: "Error creating location",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener ubicaciones por cliente
 * @param req.query.client Filtrar por cliente
 * @param req.query.active Filtrar por estado activo
 */
export const getLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { client, active } = req.query;
    const filter: any = {};
    if (client) filter.client = client;
    if (active !== undefined) filter.active = active === "true";

    const locations = await Location.find(filter)
      .populate("client", "name")
      .sort({ name: 1 });

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching locations",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener ubicación por ID
 * @param req.params.id ID de la ubicación
 */
export const getLocationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const location = await Location.findById(req.params.id).populate(
      "client",
      "name"
    );

    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching location",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Actualizar ubicación
 * @param req.params.id ID de la ubicación
 */
export const updateLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.body.userId,
      },
      { new: true }
    ).populate("client", "name");

    if (!updatedLocation) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({
      message: "Error updating location",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Desactivar ubicación
 * @param req.params.id ID de la ubicación
 */
export const deleteLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
        updatedBy: req.body.userId,
      },
      { new: true }
    );

    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    res.status(200).json({ message: "Location deactivated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deactivating location",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
