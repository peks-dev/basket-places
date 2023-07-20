import { supabase } from "./supabase/create-client-supa";

async function getUser(userId) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId);
    if (error) {
      throw error;
    }
    return data[0];
  } catch (error) {
    throw error;
  }
}

export default getUser;
