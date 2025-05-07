import { Request, Response } from "express";
import Task from "../models/Task";

// Cambia el tipo de retorno de Promise<Response | undefined> a Promise<void>
const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar campos requeridos
    const { title, description, location, category, completedDate } = req.body;
    
    if (!title || !description || !location || !category || !completedDate) {
      res.status(400).json({ 
        message: "Faltan campos requeridos" 
      });
      return; // Solo return sin nada
    }

    const newTask = new Task({
      ...req.body,
      createdBy: req.body.createdBy || "anonymous",
      updatedBy: req.body.updatedBy || "anonymous",
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
    // No hay return
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task", error });
    // No hay return
  }
};

// Modifica los demás controladores de manera similar
const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Error fetching task", error });
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        updatedBy: req.body.updatedBy || "anonymous" 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export { 
    createTask, 
    getTasks, 
    getTaskById, 
    updateTask, 
    deleteTask 
};
