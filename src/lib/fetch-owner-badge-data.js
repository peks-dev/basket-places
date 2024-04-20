import { useState } from "react";

// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";

export function useFetchOwnerBadge() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [ownerData, setOwnerData] = useState();

  async function getOwnerBadgeData(ownerId) {
    try {
      const data = await fetchDataOnTable("profiles", "id", ownerId);
      setOwnerData(data[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, ownerData, getOwnerBadgeData };
}
