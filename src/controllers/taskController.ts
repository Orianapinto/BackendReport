import { Request, Response } from "express";
import Task from "../models/Task";

/**
 * Controlador de Tareas
 * Maneja las operaciones CRUD para las tareas asignadas a diferentes ubicaciones y clientes
 */

/**
 * Crear una nueva tarea
 * @param req.body Datos de la tarea a crear
 * @param req.body.title Título de la tarea
 * @param req.body.description Descripción detallada
 * @param req.body.status Estado inicial (Planned, In progress, Completed)
 * @param req.body.type Tipo de tarea (Desarrollo, Diseño, Soporte)
 * @param req.body.client ID del cliente
 * @param req.body.location ID de la ubicación
 * @param req.body.assignedTo ID del usuario asignado
 * @param req.body.userId ID del usuario de Clerk que crea la tarea
 */
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTask = new Task({
      ...req.body,
      createdBy: req.body.userId, // From Clerk
      updatedBy: req.body.userId, // From Clerk
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener todas las tareas
 * @param req.query.client Filtrar por cliente
 * @param req.query.location Filtrar por ubicación
 * @param req.query.status Filtrar por estado
 * @param req.query.type Filtrar por tipo
 * @returns Lista de tareas que coinciden con los filtros
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { client, location, status, type } = req.query;

    const filter: any = {};
    if (client) filter.client = client;
    if (location) filter.location = location;
    if (status) filter.status = status;
    if (type) filter.type = type;

    const tasks = await Task.find(filter)
      .populate("client", "name")
      .populate("location", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Obtener una tarea por su ID
 * @param req.params.id ID de la tarea a buscar
 * @returns Tarea encontrada o error 404 si no existe
 */
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("client", "name")
      .populate("location", "name");

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Actualizar una tarea existente
 * @param req.params.id ID de la tarea a actualizar
 * @param req.body Datos a actualizar
 * @param req.body.userId ID del usuario de Clerk que realiza la actualización
 * @param req.body.nuevaActividad Texto de la nueva actividad a registrar (opcional)
 * @returns Tarea actualizada
 */
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Primero obtenemos la tarea actual para acceder al array de actividades existente
    const currentTask = await Task.findById(req.params.id);

    if (!currentTask) {
      res.status(404).json({ message: "Task not found" });
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
      updateData.actividad = [...currentTask.actividad, nuevaActividad];

      // Eliminamos el campo nuevaActividad para que no se guarde en la BD
      delete updateData.nuevaActividad;
    } else {
      // Si no se envía una nueva actividad, mantenemos el array existente
      updateData.actividad = currentTask.activity;
    }

    // Si el estado cambia a "Completed" y no hay fecha de completado, la agregamos
    if (
      updateData.status === "Completed" &&
      !updateData.completedDate &&
      currentTask.status !== "Completed"
    ) {
      updateData.completedDate = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Actualizar una tarea existente
 * @param req.params.id ID de la tarea a actualizar
 * @param req.body Datos a actualizar
 * @param req.body.userId ID del usuario de Clerk que realiza la actualización
 * @returns Tarea actualizada
 */
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
