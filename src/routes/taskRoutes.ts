import { Router } from "express";
import asyncHandler from 'express-async-handler';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController";

const router = Router();

router.route('/')
  .get(asyncHandler(getTasks))
  .post(asyncHandler(createTask));

router.route('/:id')
  .get(asyncHandler(getTaskById))
  .put(asyncHandler(updateTask))
  .delete(asyncHandler(deleteTask));

export default router;