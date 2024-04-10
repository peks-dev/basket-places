import { supabase } from "./create-client-supa";
import { ConnectionError, ValidationError } from "@/models/errors.model";

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
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}
export async function resetPassword(userEmail) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      userEmail,
      {
        redirectTo: "http://localhost:5173/update-password",
      }
    );
    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export default {
  getSession,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
};
