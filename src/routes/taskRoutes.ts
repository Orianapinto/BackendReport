import express from "express";
import { 
    createTask, 
    getTasks, 
    getTaskById, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController";

const taskRouter = express.Router();

// Rutas para tareas
// GET /api/tasks - Obtener todas las tareas (con filtros opcionales)
taskRouter.get("/", getTasks);

// GET /api/tasks/:id - Obtener una tarea específica por ID
taskRouter.get("/:id", getTaskById);

// POST /api/tasks - Crear una nueva tarea
taskRouter.post("/", createTask);

// PUT /api/tasks/:id - Actualizar una tarea existente
taskRouter.put("/:id", updateTask);

// DELETE /api/tasks/:id - Eliminar una tarea
taskRouter.delete("/:id", deleteTask);

export default taskRouter;