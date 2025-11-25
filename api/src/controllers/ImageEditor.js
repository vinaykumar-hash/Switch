import { GoogleGenAI } from "@google/genai";
import mime from "mime";
import { readFile } from "fs";
import dotenv from "dotenv";
import { saveImageToSupabase } from "../Utils/FileStorage.js";
import { model } from "../config/gemini.js";
import sharp from "sharp"; 
dotenv.config();

export async function generate(imagePaths = [], prompt, requestId) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error(" GEMINI_API_KEY not found in .env file.");

    const ai = new GoogleGenAI({ apiKey });

    const imageParts = await Promise.all(
      imagePaths.map(async (path) => {
        let buffer, mimeType;

        if (path.startsWith("http://") || path.startsWith("https://")) {
          const res = await fetch(path);
          const arrBuffer = await res.arrayBuffer();
          buffer = Buffer.from(arrBuffer);
          mimeType = res.headers.get("content-type") || "image/png";
          if (!mimeType || mimeType === "application/octet-stream") {
            const ext = path.split(".").pop().toLowerCase();
            mimeType =
              mime.getType(ext) ||
              (ext === "heic" || ext === "heif"
                ? "image/jpeg"
                : "image/png");
          }
        } else {
          mimeType = mime.getType(path);
          buffer = await new Promise((resolve, reject) => {
            readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
          });
        }
        if (mimeType === "image/heic" || mimeType === "image/heif") {
          console.log("🔄 Converting HEIC/HEIF to JPEG before sending to Gemini...");
          const convertedBuffer = await sharp(buffer).jpeg().toBuffer();
          buffer = convertedBuffer;
          mimeType = "image/jpeg";
        }

        if (!mimeType.startsWith("image/")) {
          console.warn(`⚠️ Forcing MIME type fallback for: ${path}`);
          mimeType = "image/jpeg";
        }
        return {
          inlineData: {
            mimeType,
            data: buffer.toString("base64"),
          },
        };
      })
    );

    const contents = [
      { role: "user", parts: [...imageParts, { text: prompt }] },
    ];
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: { imageSize: "1K" },
      },
    });
    
    const candidate = response.candidates?.[0];
    console.log(candidate.content)
    const part = candidate?.content?.parts?.[0];
    if (!part?.inlineData) throw new Error("No image returned from Gemini");

    const mimeType = part.inlineData.mimeType || "image/png";
    const buffer = Buffer.from(part.inlineData.data || "", "base64");

    console.log(requestId)
    const publicUrl = await saveImageToSupabase(buffer, mimeType, requestId, prompt);

    return { publicUrl, mimeType };
  } catch (error) {
    console.error(" Error generating image:", error.message);
    throw error;
  }
}
