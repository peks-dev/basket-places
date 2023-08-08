import { supabase } from "../supabase/create-client-supa";

export async function insertDataOnTable(tableName, objectToInsert) {
  try {
    const { error, data } = await supabase
      .from(tableName)
      .insert(objectToInsert)
      .select();
    if (error) {
      throw new Error(`no se pudo insertar los data en la tabla ${tableName}`);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCourt(courtId) {
  try {
    const { error, data } = await supabase
      .from("courts")
      .delete()
      .eq("id", courtId);

    if (error) {
      throw new Error("Error al eliminar cancha " + error);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
