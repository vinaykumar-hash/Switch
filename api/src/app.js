import express from "express";
import dotenv from "dotenv";
import imageEditorRoutes from "./routes/imageEditorRoutes.js";
import tempAvatarRoutes from "./routes/TempAvatarRoutes.js";
import clothGeneratorRoutes from "./routes/clothGeneratorRoutes.js";
import myGenerationsRoutes from "./routes/myGenerationsRoutes.js";
import promptOptimizerRoutes from "./routes/promptOptimizerRoutes.js";
import artStyleRoutes from "./routes/artStyleRoutes.js";
dotenv.config();
import cors from 'cors';
const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://nanoapp.onrender.com",
  "https://switchstyle.app",
  "https://nanofashion-beta.vercel.app"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.get("/", (req, res) => res.send(" Nano Banana API is running..."));

app.use("/api/gemini", imageEditorRoutes);
app.use("/api/temp", tempAvatarRoutes);
app.use("/api/gemini", clothGeneratorRoutes);
app.use("/api/gemini", myGenerationsRoutes);
app.use("/api/gemini", promptOptimizerRoutes);
app.use("/api/gemini", artStyleRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
