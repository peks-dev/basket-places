// services
import { deleteDataOnTable } from "@/services/supabase/table-operations.service";
import { deleteObjectFromStorage } from "@/services/supabase/storage-operations.service";
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";

export async function deleteCourt(userId, courtId, images) {
  const { resetUserCourtsList } = useUserCourtsRegisteredStore();
  try {
    const imgsNames = [];

    images.map((img) => {
      const imgUrlSplit = img.split("/");
      const imgName = imgUrlSplit.pop();
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
    console.error(error); // Logging the error for debugging purposes
    throw error;
  }
}
