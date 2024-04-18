import { useState } from "react";
// services
import {
  insertDataOnTable,
  fetchDataOnTable,
} from "@/services/supabase/table-operations.service";

export function useSendReview() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  async function sendCourtReview(courtId, userId, rating, comment) {
    try {
      setLoading(true);
      const data = {
        court_id: courtId,
        user_id: userId,
        rating: rating,
        comment: comment,
      };

      const comments = await fetchDataOnTable("reviews", "court_id", courtId);
      const userFound = comments.find((comment) => comment.user_id === userId);

      if (!userFound) {
        await insertDataOnTable("reviews", data);
        setSuccess("gracias por valorar esta cancha!");
      } else {
        console.log(userFound);
        setError(new Error("solo puedes poner 1 comentario por cancha"));
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, success, sendCourtReview };
}
