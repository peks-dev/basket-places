import { useState } from "react";
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";

export function useFetchUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function getUser(userId) {
    try {
      setLoading(true);
      const userData = await fetchDataOnTable("profiles", "id", userId);
      setUser(userData[0]);
    } catch (error) {
      setError(new Error("hubo un problema al obtener el usuario"));
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, user, getUser };
}
