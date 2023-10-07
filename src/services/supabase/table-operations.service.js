import { supabase } from "./create-client-supa";

export async function fetchDataOnTable(
  tableName,
  filter = null,
  filterValue = null,
  selectedColumns = null
) {
  try {
    let query = supabase.from(tableName).select();

    if (selectedColumns) {
      query = query.select(selectedColumns);
    } else {
      query = query.select(); // Seleccionar todas las columnas por defecto
    }

    if (filter && filterValue) {
      query = query.eq(filter, filterValue);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(
        `No se pudo extraer los datos de la tabla ${tableName}: ${error}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

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

export async function deleteDataOnTable(tableName, filter, filterValue) {
  try {
    const { error, data } = await supabase
      .from(tableName)
      .delete()
      .eq(filter, filterValue);

    if (error) {
      throw new Error(
        `Error deleting data from ${tableName}: ${error.message}`
      );
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataOnTable(
  tableName,
  objetUpdated,
  filter,
  filterValue
) {
  try {
    const { error } = await supabase
      .from(tableName)
      .update(objetUpdated)
      .eq(filter, filterValue);

    if (error) {
      throw new Error(`Error updating ${tableName}: ${error.message}`);
    }
  } catch (error) {
    throw error;
  }
}
