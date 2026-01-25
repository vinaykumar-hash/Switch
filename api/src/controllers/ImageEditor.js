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
          console.log(" Converting HEIC/HEIF to JPEG before sending to Gemini...");
          const convertedBuffer = await sharp(buffer).jpeg().toBuffer();
          buffer = convertedBuffer;
          mimeType = "image/jpeg";
        }

        if (!mimeType.startsWith("image/")) {
          console.warn(` Forcing MIME type fallback for: ${path}`);
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
    const fullPrompt = `
    USER REQUEST:
    ${prompt}

    SYSTEM INSTRUCTION:
    You are modifying a photo of a real person. Preserve the person’s original face, identity, skin tone, hair, pose, body shape, posture, hands, background, and lighting EXACTLY as they appear in the input image.

    Only modify the clothing if the user explicitly asks for a clothing change. If not, keep the existing clothes unchanged.

    When changing clothes:
    - Maintain realism
    - Keep body, pose, environment unchanged
    - Follow correct fabric physics
    - Keep skin tones and face identical

    `;

    const contents = [
      { role: "user", parts: [...imageParts, { text: fullPrompt }] },
    ];
    const response = await ai.models.generateContent({
      model,
      contents,
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { imageSize: "1K" },
      },
    });

    const candidate = response.candidates?.[0];
    console.log(response)
    // const part = candidate?.content?.parts?.[0];
    const imagePart = candidate?.content?.parts?.find(p => p.inlineData);
    if (!imagePart?.inlineData) throw new Error("Model response parts:", candidate?.content?.parts);

    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const buffer = Buffer.from(imagePart.inlineData.data || "", "base64");

    console.log(requestId)
    const publicUrl = await saveImageToSupabase(buffer, mimeType, requestId, prompt);

    return { publicUrl, mimeType };
  } catch (error) {
    console.error(" Error generating image:", error.message);
    throw error;
  }
}
