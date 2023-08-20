// services
import { deleteDataOnTable } from "../../../services/court/delete-data.service";
import { deleteObjectFromStorage } from "../../../services/storage/delete-storage.service";

// utilities
import { extractFilesNames } from "../../../utilities/extract-imgs-names.utility";

export async function deleteCourt(userId, courtId, images) {
  try {
    const imgsNames = extractFilesNames(images);
    const result = await deleteDataOnTable("courts", "id", courtId);

    if (result === null) {
      const dataPromise = imgsNames.map((img) => {
        deleteObjectFromStorage("imgs_courts", `${userId}/${courtId}/${img}`);
      });

      const runPromise = await Promise.all(dataPromise);
      return runPromise;
    } else {
      throw new Error(`Unexpected result while deleting court: ${result}`);
    }
  } catch (error) {
    console.error(error); // Logging the error for debugging purposes
    throw error;
  }
}
