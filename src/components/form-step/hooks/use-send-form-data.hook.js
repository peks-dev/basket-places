import { useState } from "react";

import { useUserStore } from "@/context/userStore";

// services
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
  const { profile } = useUserStore();

  const registerCourt = async (formData) => {
    try {
      console.log(formData);
      setLoading(true);
      const resultado = verifiedData(formData);
      if (resultado !== null) {
        throw new Error(resultado);
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
      console.log(lng, lat);
      const owner = profile.id;

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

      images.map(async (imageFile) => {
        // subir img a storage
        const compressedImage = await compressImage(imageFile);

        await uploadFile(
          "imgs_courts",
          `${owner}/${court_id}/${compressedImage.name}`,
          compressedImage
        );
      });

      await insertDataOnTable("locations", {
        lng,
        lat,
        country: location.country,
        state: location.state,
        city: location.city,
        court_id,
      });

      const schedulesWithCourtId = schedules.map((schedule) => ({
        ...schedule,
        court_id,
      }));
      await insertDataOnTable("schedules", schedulesWithCourtId);

      const servicesFormated = { ...services, court_id };
      await insertDataOnTable("services", servicesFormated);

      setCourtId(court_id);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, courtId, registerCourt };
}
