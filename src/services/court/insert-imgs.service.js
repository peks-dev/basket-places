import { supabase } from "../supabase/create-client-supa";

export async function uploadImage(userId, courtId, file) {
  try {
    const { data, error } = await supabase.storage
      .from("imgs_courts")
      .upload(`${userId}/${courtId}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      throw new Error("no se pudo subir la imagen");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
