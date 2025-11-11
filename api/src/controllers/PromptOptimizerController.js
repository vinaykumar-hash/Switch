import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { model } from "../config/gemini.js";

dotenv.config();

export const optimizePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required in the request body.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY in .env file.");

    const ai = new GoogleGenAI({ apiKey });

    const instruction = `
You are a creative AI prompt enhancer for *Google Nano Banana* — a futuristic fashion generation system.

User has given a image of himself and some photo of cloths , your just have to set the lighting and colors , DON'T MENTION ANY THING ABOUT THE PERSON WHICH WILL CHANGE ITS IDENTITY
Add:
- **Mood:** (calm, vibrant, futuristic, elegant)
- **Color palette:** (pastel, metallic, warm tones, neon, etc.)
- **Lighting:** (soft, golden hour, moody, cinematic)

Return your answer in **pure JSON format only**, like this:
{ Wear the Cloths provided ,  
"futuristic",
  "silver and yellow tones",
  "dynamic neon reflections"
}
`;

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: `${instruction}\n\nUser prompt: ${prompt}` }],
        },
      ],
      config: {
        temperature: 0.7,
      },
    });

    console.log(response.candidates?.[0]?.content?.parts?.[0]?.text);

    const candidate = response?.candidates?.[0];
    const textOutput =
      candidate?.content?.parts?.[0]?.text

    if (!textOutput) throw new Error("Gemini returned an empty response.");

    // Attempt JSON parse
    let optimizedData;
    try {
      optimizedData = JSON.parse(textOutput);
    } catch (err) {
      console.warn("Gemini did not return valid JSON. Using fallback text.");
      optimizedData = {
        optimized_prompt: textOutput.trim(),
        mood: "Unknown",
        scene: "Unknown",
        color: "Unknown",
        lighting: "Unknown",
      };
    }

    res.json({
      success: true,
      original_prompt: prompt,
      ...optimizedData,
    });
  } catch (error) {
    console.error(" Error optimizing prompt:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
