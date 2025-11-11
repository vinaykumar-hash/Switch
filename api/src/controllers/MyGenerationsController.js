import { supabase } from "../config/supaBase.js";

export const getUserGeneratedImages = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({ success: false, error: "Missing Profile ID" });
    }

    const { data, error } = await supabase
      .from("generated_images")
      .select("id, image_url, request_id, created_at")
      .eq("request_id", profileId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;

    return res.json({ success: true, cloths: data });
  } catch (error) {
    console.error(" Error fetching user-generated images:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
