import { supabase } from "../config/supaBase.js";


export async function saveImageToSupabase(buffer, mimeType, requestId, prompt) {
  try {
    const fileExt = mimeType.split("/")[1] || "png";
    const fileName = `${requestId}_${Date.now()}.${fileExt}`;
    const filePath = `generated/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("generated-images")
      .upload(filePath, buffer, {
        contentType: mimeType,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("generated-images")
      .getPublicUrl(filePath);

    const publicUrl = publicData.publicUrl;

    const { error: dbError } = await supabase.from("generated_cloths").insert([
      {
        image_url: publicUrl,
        prompt,
      },
    ]);

    if (dbError) throw dbError;

    console.log(` Image saved and logged: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(" Error saving image to Supabase:", error.message);
    throw error;
  }
}
