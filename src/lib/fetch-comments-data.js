import { useState } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// context
import { useCommentStore } from "@/context/commentsStore.";

export function useFetchComments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { saveComments } = useCommentStore();

  async function getCommentsForCourt(courtId) {
    try {
      setLoading(true);
      const comments = await fetchDataOnTable("reviews", "court_id", courtId);
      saveComments(comments);
    } catch (error) {
      setError(new Error("hubo un error al obtener los commentarios"));
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, getCommentsForCourt };
}
