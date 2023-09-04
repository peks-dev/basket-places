import { useState } from "react";
import { insertDataOnTable } from "../../../services/supabase/table-operations.service";
import { uploadFile } from "../../../services/supabase/storage-operations.service";

// utilities
import { verifiedData } from "../utilities/verified-data.utilitie";
import { compressImage } from "../../../utilities/compress-img.utility";

export function useSendFormData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [courtId, setCourtId] = useState(null);

  const registerCourt = async (formData, userId) => {
    try {
      setLoading(true);
      const resultado = verifiedData(formData);
      if (resultado !== null) {
        throw new Error(resultado);
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

          await uploadFile(
            "imgs_courts",
            `${userId}/${court_id}/${compressedImage.name}`,
            compressedImage
          );
          // Guardar el nombre de los archivos subidos
          const newObjectImage = {
            file_name: imageFile.name,
            court_id: court_id,
          };
          await insertDataOnTable("images", newObjectImage);
        })
      );

      setCourtId(court_id);
      setSuccess(true);
    } catch (error) {
      setError("Error al insertar los datos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, courtId, registerCourt };
}
