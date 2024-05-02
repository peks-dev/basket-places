import { useState } from "react";
// models
import { ValidationError } from "@/models/errors.model";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// context
import { useCommentStore } from "@/context/commentsStore.";

export default function useFetchComments() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { saveComments } = useCommentStore();

  async function fetchCommentsForCourt(courtId) {
    try {
      setLoading(true);
      const data = await fetchDataOnTable("reviews", "court_id", courtId);
      // cache data
      saveComments(data);
    } catch (error) {
      console.log(error);
      if (error.message.includes("Failed to fetch")) {
        setError(new ValidationError("no tienes conexion"));
      } else {
        setError(new Error("no se pudo obtener los comentarios"));
      }
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, fetchCommentsForCourt };
}
