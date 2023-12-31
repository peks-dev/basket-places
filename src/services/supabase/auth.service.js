import { supabase } from "./create-client-supa";

export async function login(userEmail, userPassword) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    if (error === undefined) {
      return;
    }

    throw error;
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function register(userEmail, userPassword) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });
    if (error) {
      throw new Error(error.message); // Lanza un error con el mensaje de error recibido
    }
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return console.log("error: ", error);
    }
    return data.session;
  } catch (error) {
    return error;
  }
}

export default { getSession, login, logout, register };
