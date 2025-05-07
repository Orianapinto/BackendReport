import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
} from "../controllers/taskController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.use(authMiddleware);
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);

export default router;
