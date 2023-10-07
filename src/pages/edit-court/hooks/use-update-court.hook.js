import { useState, useContext } from "react";

// utilities
import { findDifferences } from "../utils/compare-objects.utilitys";
import { compressImage } from "../../../utilities/compress-img.utility";

// context
import CourtContext from "../../../context/court/court-context";

// services
import { updateDataOnTable } from "../../../services/supabase/table-operations.service";
import { insertDataOnTable } from "../../../services/supabase/table-operations.service";
import { deleteDataOnTable } from "../../../services/supabase/table-operations.service";
import { deleteObjectFromStorage } from "../../../services/supabase/storage-operations.service";
import { uploadFile } from "../../../services/supabase/storage-operations.service";

//adapters
import locationAdapter from "../adapter/location.adapter";

// hooks
import { useGetDataCourt } from "../../court-details/hooks/use-get-data-court.hook";

export function useUpdateCourt(courtId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { courtState } = useContext(CourtContext);
  const {
    allDataCourt,
    loading: loadingData,
    error: errorData,
  } = useGetDataCourt(courtId);

  const updateLocation = async (location) => {
    const newLocation = locationAdapter(location);
    await updateDataOnTable("locations", newLocation, "court_id", courtId);
  };

  const updateMainTableData = async (mainTableData) => {
    if (Object.keys(mainTableData).length > 0) {
      await updateDataOnTable("courts", mainTableData, "id", courtId);
    }
  };

  const updateSchedules = async (schedules) => {
    if (schedules.added) {
      const schedulesWithCourtId = schedules.added.map((schedule) => ({
        ...schedule,
        court_id: courtId,
      }));
      await insertDataOnTable("schedules", schedulesWithCourtId);
    }

    if (schedules.removed) {
      await Promise.all(
        schedules.removed.map(async (schedule) => {
          await deleteDataOnTable("schedules", "id", schedule.id);
        })
      );
    }
  };

  const updateServices = async (services) => {
    if (services) {
      await updateDataOnTable("services", services, "court_id", courtId);
    }
  };

  const updateImages = async (images) => {
    if (images.removed.length > 0) {
      await Promise.all(
        images.removed.map(async (img) => {
          const sectionsPath = img.split("/");
          const imgName = sectionsPath[10];

          await deleteDataOnTable("images", "file_name", imgName);
          await deleteObjectFromStorage(
            "imgs_courts",
            `${allDataCourt.owner}/${courtId}/${imgName}`
          );
        })
      );
    }

    if (images.added.length > 0) {
      await Promise.all(
        images.added.map(async (imageFile) => {
          const compressedImage = await compressImage(imageFile);

          await uploadFile(
            "imgs_courts",
            `${allDataCourt.owner}/${courtId}/${compressedImage.name}`,
            compressedImage
          );

          const newObjectImage = {
            file_name: imageFile.name,
            court_id: courtId,
          };
          await insertDataOnTable("images", newObjectImage);
        })
      );
    }
  };

  const updateCourt = async () => {
    try {
      if (!allDataCourt) {
        console.log("cargando");
      }
      setLoading(true);

      const updates = findDifferences(allDataCourt, courtState);

      const { location, images, services, schedules, owner, ...mainTableData } =
        updates;

      if (location) {
        await updateLocation(location);
      }

      await updateMainTableData(mainTableData);

      if (schedules) {
        await updateSchedules(schedules);
      }

      await updateServices(services);

      if (images) {
        await updateImages(images);
      }

      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError("hubo un error al actualizar la cancha: " + error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, updateCourt };
}
