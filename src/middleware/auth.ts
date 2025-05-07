import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as any; // Type assertion for the decoded user
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

export default authMiddleware;
