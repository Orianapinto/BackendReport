import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// Función para registrar un nuevo usuario en la base de datos
const createUser = async (req: Request, res: Response) => {
  const { password, ...userData } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña
    const user = new User({ ...userData, password: hashedPassword }); // Crear usuario con contraseña hasheada
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Función para iniciar sesión de un usuario
// Verifica si el usuario existe y si la contraseña es correcta
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user", error });
  }
};

export { createUser, loginUser };
