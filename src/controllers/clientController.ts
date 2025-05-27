import { Request, Response } from "express";
import Client from "../models/Client";

/**
 * Controlador de Clientes
 * Maneja las operaciones CRUD y la gestión de clientes y sus ubicaciones
 */

/**
 * Crear nuevo cliente
 * @param req.body Datos del cliente
 * @param req.body.userId ID del usuario de Clerk
 */
export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newClient = new Client({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId,
    });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({
      message: "Error creating client",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener todos los clientes
 * @param req.query.active Filtrar por estado activo/inactivo
 */
export const getClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { active } = req.query;
    const filter: any = {};
    if (active !== undefined) {
      filter.active = active === "true";
    }

    const clients = await Client.find(filter)
      .populate("locations")
      .sort({ name: 1 });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching clients",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener cliente por ID
 * @param req.params.id ID del cliente
 */
export const getClientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id).populate("locations");

    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching client",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Actualizar cliente
 * @param req.params.id ID del cliente
 * @param req.body Datos a actualizar
 */
export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.body.userId,
      },
      { new: true }
    ).populate("locations");

    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({
      message: "Error updating client",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Eliminar cliente (desactivar)
 * @param req.params.id ID del cliente
 */
export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
        updatedBy: req.body.userId,
      },
      { new: true }
    );

    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json({ message: "Client deactivated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deactivating client",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
