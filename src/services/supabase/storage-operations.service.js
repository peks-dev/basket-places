import { supabase } from "./create-client-supa";

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

export async function uploadFile(bucket, path, file) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteObjectFromStorage(bucket, path) {
  try {
    const { data, error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(`Error deleting object from storage: ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`Error in deleteObjectFromStorage: ${error.message}`);
  }
}

export async function getFileUrl(bucket, fileName) {
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data;
  } catch (error) {
    throw error;
  }
}
