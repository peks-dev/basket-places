import { verifiedData } from "../utilities/verified-data.utilitie";
import { insertDataOnTable } from "../../../services/court/insert-court-data.service";
import { uploadImage } from "../../../services/court/insert-imgs.service";

export async function sendForm(formData, userId) {
  try {
    const resultado = verifiedData(formData);
    console.log(resultado);
    if (resultado !== null) {
      return { message: resultado };
    }

    const { location, images, services, schedules, ...mainTableData } =
      formData;
    const { lng, lat, ...locationData } = location.coordinates;
    const owner = userId;

    const resultMainTable = await insertDataOnTable("courts", {
      ...mainTableData,
      owner,
    });
    const court_id = resultMainTable[0].id;

    await insertDataOnTable("locations", { ...locationData, court_id });

    const schedulesWithCourtId = formData.schedules.map((schedule) => ({
      ...schedule,
      court_id,
    }));
    await insertDataOnTable("schedules", schedulesWithCourtId);

    const servicesFormated = { ...services, court_id };
    await insertDataOnTable("services", servicesFormated);

    await Promise.all(
      images.map(async (imageFile) => {
        await uploadImage(userId, court_id, imageFile);
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
