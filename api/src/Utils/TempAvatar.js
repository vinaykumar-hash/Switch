import { supabase } from "../config/supaBase.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const uploadTempAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }

    const file = req.file;
    const fileExt = path.extname(file.originalname) || ".png";
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("TempAvatar")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("TempAvatar")
      .getPublicUrl(filePath);

    const publicUrl = publicData.publicUrl;

    console.log(` Temp avatar uploaded: ${publicUrl}`);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      url: publicUrl,
    });
  } catch (error) {
    console.error(" Error uploading temp avatar:", error.message);
    res.status(500).json({ error: error.message });
  }
};
