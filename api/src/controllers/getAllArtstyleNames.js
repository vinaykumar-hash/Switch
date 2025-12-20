import { supabase } from "../config/supaBase.js";
import { Redis } from '@upstash/redis';
import dotenv from "dotenv";

dotenv.config();

// Initialize outside the handler to reuse the connection across requests
const redis = Redis.fromEnv();

export const getAllArtstyleNames = async (req, res) => {
  const CACHE_KEY = "artStyles";

  try {
    // 1. Try to fetch from Redis
    const cachedStyles = await redis.get(CACHE_KEY);

    if (cachedStyles) {
      return res.status(200).json({ 
        success: true, 
        styles: cachedStyles, 
        source: "cache" // Useful for debugging
      });
    }

    // 2. If not in cache, fetch from Supabase
    const { data, error } = await supabase
      .from("artstyles")
      .select("name")
      .order("name", { ascending: true });

    if (error) throw error;

    // 3. Store in Redis with an expiration (e.g., 1 hour = 3600 seconds)
    // This prevents the cache from becoming permanently stale.
    await redis.set(CACHE_KEY, data, { ex: 3600 });

    return res.status(200).json({ 
      success: true, 
      styles: data, 
      source: "database" 
    });

  } catch (error) {
    console.error("Error fetching artstyle names:", error.message);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error" 
    });
  }
};