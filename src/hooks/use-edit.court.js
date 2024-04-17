import { useState } from "react";
// models
import { ValidationError } from "@/models/errors.model";
// context
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";
// services
import {
  updateDataOnTable,
  deleteDataOnTable,
  insertDataOnTable,
} from "@/services/supabase/table-operations.service";
import {
  deleteObjectFromStorage,
  uploadFile,
} from "@/services/supabase/storage-operations.service";
// utilities
import validateStepFormData from "@/utilities/validate-step-form-data.utility";
import { compareObjects } from "@/utilities/compare-objects.utility";
import { compressImage } from "@/utilities/compress-img.utility";

// context
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";

export function useEditCourt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { formData } = useStepFormStore();
  const { profile } = useUserStore();
  const { resetUserCourtsList, userCourtsList } =
    useUserCourtsRegisteredStore();

  async function sendCourtUpdates() {
    try {
      setLoading(true);
      // make sure every field has data
      const emptyFields = validateStepFormData(formData);
      if (emptyFields.length < 1) {
        const courtInDataBase = userCourtsList.find(
          (court) => court.id === formData.id
        );

        const differences = compareObjects(formData, courtInDataBase);

        // has differences?
        if (Object.keys(differences).length > 0) {
          // handle images changes
          if (differences.images) {
            let newImages = { images: [] };
            const resultado = differences.images.newData.reduce(
              (acumulador, elemento) => {
                if (typeof elemento === "string") {
                  acumulador.strings.push(elemento);
                } else {
                  acumulador.noStrings.push(elemento);
                }
                return acumulador;
              },
              { strings: [], noStrings: [] }
            );

            const imgsDeleted = differences.images.oldData.filter(
              (img) => !resultado.strings.includes(img)
            );
            const imgNamesDeleted = imgsDeleted.map((url) => {
              const partesUrl = url.split("/");
              return partesUrl[partesUrl.length - 1];
            });

            // delete imgs on storage
            for (const img of imgNamesDeleted) {
              await deleteObjectFromStorage(
                "imgs_courts",
                `${profile.id}/${formData.id}/${img}`
              );
            }
            // insert new imgs on storage
            for (const img of resultado.noStrings) {
              const compressedImage = await compressImage(img);
              console.log(compressedImage);
              newImages.images.push(compressedImage.name);
              // creacion de la url
              await uploadFile(
                "imgs_courts",
                `${courtInDataBase.owner}/${formData.id}/${compressedImage.name}`,
                compressedImage
              );
            }

            await updateDataOnTable("courts", newImages, "id", formData.id);
          }

          // handle schedules
          if (differences.schedules) {
            await deleteDataOnTable("schedules", "court_id", formData.id);
            // adapt data
            const schedulesWithCourtId = differences.schedules.newData.map(
              (schedule) => ({
                ...schedule,
                court_id: formData.id,
              })
            );
            await insertDataOnTable("schedules", schedulesWithCourtId);
          }
          // handle location
          if (differences.location) {
            // prepare data
            const { city, state, country, coordinates } =
              differences.location.newData;
            const { lat, lng } = coordinates;
            const locationUpdate = { city, state, country, lat, lng };

            // send data
            await updateDataOnTable(
              "locations",
              locationUpdate,
              "court_id",
              formData.id
            );
          }
          // handle services
          if (differences.services) {
            await updateDataOnTable(
              "services",
              differences.services.newData,
              "court_id",
              formData.id
            );
          }

          // handle main data
          const dataForMainTable = {};

          if (differences.name) {
            dataForMainTable.name = differences.name.newData;
          }
          if (differences.description) {
            dataForMainTable.description = differences.description.newData;
          }
          if (differences.game_level) {
            dataForMainTable.game_level = differences.game_level.newData;
          }
          if (differences.place_type) {
            dataForMainTable.place_type = differences.place_type.newData;
          }
          if (differences.roof) {
            dataForMainTable.roof = differences.roof.newData;
          }
          if (differences.floor_type) {
            dataForMainTable.floor_type = differences.floor_type.newData;
          }

          // send data
          if (Object.keys(dataForMainTable).length > 0) {
            // El objeto no está vacío, tiene al menos una propiedad
            await updateDataOnTable(
              "courts",
              dataForMainTable,
              "id",
              formData.id
            );
          }
          resetUserCourtsList();
          setSuccess(true);
        } else {
          setError(new ValidationError("no has cambiado nada"));
        }
      }
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function resetError() {
    setError(null);
  }

  return { sendCourtUpdates, loading, error, success, resetError };
}
