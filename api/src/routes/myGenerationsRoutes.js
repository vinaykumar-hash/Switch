import express from "express";
import { getUserGeneratedImages } from "../controllers/MyGenerationsController.js";

const router = express.Router();

// GET /api/gemini/generated-images/:profileId
router.get("/generated-images/:profileId", getUserGeneratedImages);

// DELETE /api/gemini/generated-images/:id
import { deleteUserGeneratedImage } from "../controllers/MyGenerationsController.js";
router.delete("/generated-images/:id", deleteUserGeneratedImage);

export default router;
