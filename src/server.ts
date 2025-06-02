import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes"; // Importar todas las rutas desde el index

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar todas las rutas bajo /api
app.use("/api", apiRoutes);

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejo global de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "production" ? undefined : err.message,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

// Para manejo adecuado de promesas no capturadas
process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesa no controlada rechazada:", reason);
});
