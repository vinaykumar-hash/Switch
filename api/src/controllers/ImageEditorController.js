import { generate } from "../controllers/ImageEditor.js";

export const editImage = async (req, res) => {
  try {
    const { imageUrls, prompt,id } = req.body;

    const result = await generate(imageUrls, prompt , id);

    res.json({
      success: true,
      mimeType: result.mimeType,
      url: result.publicUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
