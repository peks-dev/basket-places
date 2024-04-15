import { useState } from "react";
// context
import { useUserStore } from "@/context/userStore";
import { useStepFormStore } from "@/context/stepFormStore";
// models
import { ValidationError, ConnectionError } from "@/models/errors.model";
// services
import { insertDataOnTable } from "@/services/supabase/table-operations.service";
import { uploadFile } from "@/services/supabase/storage-operations.service";

// utilities
import { compressImage } from "@/utilities/compress-img.utility";
import validateStepFormData from "@/utilities/validate-step-form-data.utility";

export function useRegisterNewCourt() {
  const { formData } = useStepFormStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { profile } = useUserStore();

  function resetError() {
    setError(null);
  }

  const registerCourt = async () => {
    try {
      setLoading(true);
      const resultado = validateStepFormData(formData);
      if (resultado.length > 0) {
        console.log(resultado);
        throw new ValidationError("no dejes campos vacios", resultado);
      }

      const {
        location,
        images,
        services,
        schedules,
        name,
        description,
        game_level,
        place_type,
        floor_type,
        roof,
      } = formData;

      const { lng, lat } = location.coordinates;
      const owner = profile.id;
      // prepare structure to send at courts table
      let mainTableData = {
        name,
        description,
        game_level,
        place_type,
        floor_type,
        roof,
        images: [],
      };

      await Promise.all(
        images.map(async (imageFile) => {
          // Guardar nombres imgs en tabla
          const imgName = imageFile.name;
          mainTableData.images.push(imgName);
        })
      );

      const resultMainTable = await insertDataOnTable("courts", {
        ...mainTableData,
        owner,
      });
      const court_id = resultMainTable[0].id;
      // handle images
      images.map(async (imageFile) => {
        // subir img a storage
        const compressedImage = await compressImage(imageFile);
        // creacion de la url
        await uploadFile(
          "imgs_courts",
          `${owner}/${court_id}/${compressedImage.name}`,
          compressedImage
        );
      });
      // handle location
      await insertDataOnTable("locations", {
        lng,
        lat,
        country: location.country,
        state: location.state,
        city: location.city,
        court_id,
      });
      // handle schedules
      const schedulesWithCourtId = schedules.map((schedule) => ({
        ...schedule,
        court_id,
      }));
      await insertDataOnTable("schedules", schedulesWithCourtId);
      // handle Services
      const servicesFormated = { ...services, court_id };
      await insertDataOnTable("services", servicesFormated);

      setSuccess(court_id);
    } catch (error) {
      if (error.name === "Failed to fetch") {
        setError(new ConnectionError("no tienes conexion a internet"));
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, registerCourt, resetError };
}
