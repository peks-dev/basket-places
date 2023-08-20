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
