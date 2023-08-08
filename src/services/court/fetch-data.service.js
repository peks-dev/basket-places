import { supabase } from "../supabase/create-client-supa";

export async function fetchDataOnTable(tableName, filter, filterValue) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select()
      .eq(filter, filterValue);

    if (error) {
      throw new Error(
        `no se pudo extraer los data de la tabla ${tableName} ` + error
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCourtsList() {
  try {
    const { data, error } = await supabase.from("courts").select();
    if (error) {
      throw new Error("Salio algo mal al obtener el listado de canchas");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
