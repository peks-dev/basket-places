// hooks/use-set-data-card.hook.js
import { fetchDataOnTable } from "../services/court/fetch-data.service";
import { createImgUrl } from "../services/court/create-url.service";
import { courtCardDataAdapter } from "../components/court-card-preview/adapters/court-card-data.adapter";

export async function dataCourtCard(courtId) {
  try {
    const courtData = await fetchDataOnTable("courts", "id", courtId);
    const locationData = await fetchDataOnTable(
      "locations",
      "court_id",
      courtId
    );
    const imagesNames = await fetchDataOnTable("images", "court_id", courtId);

    const urlsPromises = imagesNames.map((imgName) => {
      return createImgUrl(courtData[0].owner, courtId, imgName.file_name);
    });

    const urlImgs = await Promise.all(urlsPromises);

    return courtCardDataAdapter(courtData, locationData, urlImgs);
  } catch (error) {
    throw error;
  }
}
