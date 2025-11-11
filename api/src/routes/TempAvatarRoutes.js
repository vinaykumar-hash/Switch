import express from "express";
import multer from "multer";
import { uploadTempAvatar } from "../controllers/TempAvatarController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/temp/upload-avatar
router.post("/upload-avatar", upload.single("image"), uploadTempAvatar);

export default router;
