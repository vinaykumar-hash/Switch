import express from "express";
import {
  generateCloth,
  getGeneratedCloths,
} from "../controllers/ClothGeneratorController.js";

const router = express.Router();

router.post("/generate-cloth", generateCloth);

router.get("/generated-cloths", getGeneratedCloths);

export default router;
