import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { saveImageToSupabase } from "../Utils/FileStorageCloths.js";
import { supabase } from "../config/supaBase.js";
import { model } from "../config/gemini.js";
import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
dotenv.config();


export const generateCloth = async (req, res) => {
  try {

    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY missing from .env");

    const ai = new GoogleGenAI({ apiKey });


    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { imageSize: "1K" },
      },
    });

    const candidate = response.candidates?.[0];
    // const part = candidate?.content?.parts?.[0];
    const imagePart = candidate?.content?.parts?.find(p => p.inlineData);
    if (!imagePart?.inlineData) throw new Error("No image returned from Gemini");

    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const buffer = Buffer.from(imagePart.inlineData.data, "base64");

    const requestId = uuidv4();
    const publicUrl = await saveImageToSupabase(buffer, mimeType, requestId, prompt);
    await redis.del("ClothesGenerated");
    res.json({ success: true, url: publicUrl, prompt });
  } catch (error) {
    console.error(" Error generating cloth image:", error.message);
    res.status(500).json({ error: error.message });
  }
};


export const getGeneratedCloths = async (req, res) => {
  const CACHE_KEY = "ClothesGenerated";
  try {
    const cachedClothes = await redis.get(CACHE_KEY);
    if (cachedClothes) {
      return res.status(200).json({
        success: true,
        cloths: cachedClothes,
        source: "cache"
      });
    }
    const { data, error } = await supabase
      .from("generated_cloths")
      .select("id, image_url, prompt, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    await redis.set(CACHE_KEY, data, { ex: 3600 });
    res.json({ success: true, cloths: data });
  } catch (error) {
    console.error("❌ Error fetching cloths:", error.message);
    res.status(500).json({ error: error.message });
  }
};
