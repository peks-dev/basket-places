import { verifiedData } from "../utilities/verified-data.utilitie";
import {
  createCourt,
  insertLocationCourt,
  insertSchedulesCourt,
  insertServicesCourt,
} from "../../../services/court/insert-court-data.service";
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

    const resultMainTable = await createCourt({ ...mainTableData, owner });
    const court_id = resultMainTable[0].id;

    await insertLocationCourt({ ...locationData, court_id });

    const schedulesWithCourtId = formData.schedules.map((schedule) => ({
      ...schedule,
      court_id,
    }));
    await insertSchedulesCourt(schedulesWithCourtId);

    const servicesFormated = { ...services, court_id };
    await insertServicesCourt(servicesFormated);

    await Promise.all(
      images.map((imageFile) => uploadImage(userId, court_id, imageFile))
    );

    return { message: "Datos insertados correctamente" };
  } catch (error) {
    return { message: "Error al insertar los datos: " + error.message };
  }
}
