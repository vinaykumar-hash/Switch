import express from "express";
import { getUserGeneratedImages } from "../controllers/MyGenerationsController.js";

const router = express.Router();

// GET /api/gemini/generated-images/:profileId
router.get("/generated-images/:profileId", getUserGeneratedImages);

export default router;
