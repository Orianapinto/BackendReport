import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

const createTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newTask = new Task({
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
      .populate("createdBy", "name")
      .populate("updatedBy", "name");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("updatedBy", "name");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Error fetching task", error });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
