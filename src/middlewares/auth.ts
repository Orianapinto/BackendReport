import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// Extender la interfaz Request para incluir el usuario autenticado
interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

// Middleware para verificar el token de autorización
const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader: string | undefined = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token: string = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export { verifyToken };
