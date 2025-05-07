import { createUser, loginUser } from "../controllers/userControllers";
import express, { Request, Response } from "express";

const userRoute = express.Router();

userRoute.post("/", async (req: Request, res: Response) => {
  await createUser(req, res);
});

userRoute.post("/login", async (req: Request, res: Response) => {
  await loginUser(req, res);
});

export default userRoute;
