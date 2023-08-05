// services
import { insertDataOnTable } from "../../../services/court/insert-court-data.service";
import { uploadImage } from "../../../services/court/insert-imgs.service";

// utilities
import { verifiedData } from "../utilities/verified-data.utilitie";
import { compressImage } from "../utilities/compress-img.utilitie";

export async function sendForm(formData, userId) {
  try {
    const resultado = verifiedData(formData);
    if (resultado !== null) {
      return { message: resultado };
    }

    const { location, images, services, schedules, ...mainTableData } =
      formData;
    const { lng, lat } = location.coordinates;
    const owner = userId;

    const resultMainTable = await insertDataOnTable("courts", {
      ...mainTableData,
      owner,
    });
    const court_id = resultMainTable[0].id;

    await insertDataOnTable("locations", {
      lng,
      lat,
      country: location.country,
      state: location.state,
      city: location.city,
      court_id,
    });

    const schedulesWithCourtId = formData.schedules.map((schedule) => ({
      ...schedule,
      court_id,
    }));
    await insertDataOnTable("schedules", schedulesWithCourtId);

    const servicesFormated = { ...services, court_id };
    await insertDataOnTable("services", servicesFormated);

    await Promise.all(
      images.map(async (imageFile) => {
        // Comprimir la imagen antes de subirla
        const compressedImage = await compressImage(imageFile);

        await uploadImage(userId, court_id, compressedImage);
        // Guardar el nombre de los archivos subidos
        const newObjectImage = {
          file_name: imageFile.name,
          court_id: court_id,
        };
        await insertDataOnTable("images", newObjectImage);
      })
    );

    return { message: "Datos insertados correctamente" };
  } catch (error) {
    return { message: "Error al insertar los datos: " + error.message };
  }
}
