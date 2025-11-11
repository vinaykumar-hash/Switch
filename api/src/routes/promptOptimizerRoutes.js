import express from "express";
import { optimizePrompt } from "../controllers/PromptOptimizerController.js";

const router = express.Router();

// POST /api/gemini/optimize-prompt
router.post("/optimize-prompt", optimizePrompt);

export default router;
