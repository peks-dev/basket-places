import { supabase } from "../supabase/create-client-supa";

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
