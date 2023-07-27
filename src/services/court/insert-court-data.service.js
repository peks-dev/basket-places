// Crear la tabla principal para relacionar las demas
import { supabase } from "../supabase/create-client-supa";

export async function createMaintable(
  name,
  description,
  game_level,
  place_type,
  roof,
  floor_type,
  owner
) {
  try {
    const { error, data } = await supabase
      .from("courts")
      .insert({
        name: name,
        description: description,
        game_level: game_level,
        place_type: place_type,
        roof: roof,
        floor_type: floor_type,
        owner: owner,
      })
      .select();

    if (error) {
      throw new Error("Error al insertar los datos de la cancha");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
