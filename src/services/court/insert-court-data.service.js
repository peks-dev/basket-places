import { supabase } from "../supabase/create-client-supa";

// Crear la tabla principal para relacionar las demas
export async function createCourt(objectData) {
  try {
    const { error, data } = await supabase
      .from("courts")
      .insert(objectData)
      .select();

    if (error) {
      throw new Error("Error al insertar los datos de la cancha");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function insertLocationCourt(locationObject) {
  try {
    const { error, data } = await supabase
      .from("locations")
      .insert(locationObject)
      .select();
    if (error) {
      throw new Error("Error al insertar datos en location table");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function insertSchedulesCourt(schedules) {
  try {
    const { error, data } = await supabase
      .from("schedules")
      .insert(schedules)
      .select();
    if (error) {
      throw new Error("no se pudo insertar los schedules");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function insertServicesCourt(services) {
  try {
    const { error, data } = await supabase
      .from("services")
      .insert(services)
      .select();
    if (error) {
      throw new Error("no se pudo insertar los servicios");
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
      throw new Error("Error al eliminar cancha");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
