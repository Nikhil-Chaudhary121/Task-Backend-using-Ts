import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import otpRoutes from "./routes/otp.routes";
import noteRoutes from "./routes/note.routes";
import connectDB from "./config/db";

dotenv.config();
const app = express();

connectDB()

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/notes", noteRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

export default app;