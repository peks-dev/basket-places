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
      throw new Error(error.message);
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
      console.log(error);
      throw new Error(error.message);
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

export async function fetchUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.auth.getSession();

    console.log(user);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function fetchDataOnTableTest(
  tableName,
  filter = null,
  filterValue = null,
  selectedColumns = null
) {
  return new Promise((resolve, reject) => {
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

      query.then(({ data, error }) => {
        if (error) {
          reject(new Error(error.message));
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
