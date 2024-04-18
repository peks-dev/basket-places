import { useState } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";

export function useFetchComments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(null);

  async function getCommentsForCourt(courtId) {
    try {
      setLoading(true);
      const comments = await fetchDataOnTable("reviews", "court_id", courtId);

      setComments(comments);
    } catch (error) {
      setError(new Error("hubo un error al obtener los commentarios"));
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, comments, getCommentsForCourt };
}
