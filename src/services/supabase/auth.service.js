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
      options: {
        emailRedirectTo: "https://basket-places.website/confirm-account",
      },
    });
    if (error) {
      throw new Error(error.message); // Lanza un error con el mensaje de error recibido
    }
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
        redirectTo: "https://basket-places.website/update-password",
      }
    );
    if (error) {
      throw error;
    }

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
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const { data, error } = await supabase.rpc("delete_user_auth", {
      user_id: userId,
    });
    if (error) {
      throw new Error(error.message);
    }
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
