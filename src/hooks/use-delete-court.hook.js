// services
import { deleteDataOnTable } from "@/services/supabase/table-operations.service";
import { deleteObjectFromStorage } from "@/services/supabase/storage-operations.service";
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";
import { useState } from "react";

export function useDeleteCourt() {
  const { resetUserCourtsList } = useUserCourtsRegisteredStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCourtById = async (userId, courtId, images) => {
    try {
      setLoading(true);
      const imgsNames = [];
      images.map((img) => {
        const imgName = img.split("/").pop();
        imgsNames.push(imgName);
      });
      const result = await deleteDataOnTable("courts", "id", courtId);

      if (result === null) {
        const dataPromise = imgsNames.map((img) => {
          deleteObjectFromStorage("imgs_courts", `${userId}/${courtId}/${img}`);
        });

        const runPromise = await Promise.all(dataPromise);
        resetUserCourtsList();
        return runPromise;
      } else {
        throw new Error(`Unexpected result while deleting court: ${result}`);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteCourtById };
}
