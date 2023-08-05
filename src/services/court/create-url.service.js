import { supabase } from "../supabase/create-client-supa";

export function createImgUrl(userId, courtId, fileName) {
  try {
    const { data, error } = supabase.storage
      .from("imgs_courts")
      .getPublicUrl(`${userId}/${courtId}/${fileName}`);

    if (error) {
      throw new Error("Hubo un error al solicitar url de las imagenes");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
