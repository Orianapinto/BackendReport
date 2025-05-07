import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import improvementRoute from "./routes/improvementRoute";
import userRoute from "./routes/userRoute";
import { verifyToken } from "./middlewares/auth";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/improvements", improvementRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
