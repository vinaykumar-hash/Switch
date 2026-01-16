import { supabase } from "../config/supaBase.js";
import { Redis } from '@upstash/redis';
import dotenv from "dotenv";

dotenv.config();

const redis = Redis.fromEnv();
export const getUserGeneratedImages = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({ success: false, error: "Missing Profile ID" });
    }
    const CACHE_KEY = `images:${profileId}`;
    const cachedImages = await redis.get(CACHE_KEY);
    if (cachedImages) {
      return res.json({
        success: true,
        cloths: cachedImages,
        source: "cache"
      });
    }
    const { data, error } = await supabase
      .from("generated_images")
      .select("id, image_url, request_id, created_at, prompt")
      .eq("request_id", profileId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (data && data.length > 0) {
      await redis.set(CACHE_KEY, data, { ex: 300 });
    }
    return res.json({ success: true, cloths: data, source: "database" });
  } catch (error) {
    console.error(" Error fetching user-generated images:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUserGeneratedImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { profileId } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: "Missing Image ID" });
    }

    // 1. Delete from Database
    const { error } = await supabase
      .from("generated_images")
      .delete()
      .eq("id", id);

    if (error) throw error;

    // 2. Invalidate Cache if profileId provided
    if (profileId) {
      const CACHE_KEY = `images:${profileId}`;
      await redis.del(CACHE_KEY);
    }

    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, error: "Failed to delete image" });
  }
};
