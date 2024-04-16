import { useEffect, useState } from "react";
// context
import { useStepFormStore } from "@/context/stepFormStore";

export function useFormFiller(courtData) {
  const [loading, setLoading] = useState(null);
  const {
    updateCity,
    updateCountry,
    updateState,
    updateCoordinates,
    updateImages,
    updateName,
    updateDescription,
    updateGameLevel,
    updatePlaceType,
    updateRoof,
    updateFloorType,
    updateSchedule,
    updateWifi,
    updateBathroom,
    updateTransport,
    updateShop,
    updateId,
    updateOwner,
  } = useStepFormStore();

  function fillCourtState(data) {
    setLoading(true);
    // Territoy selection
    updateCountry(data.location.country);
    updateState(data.location.state);
    updateCity(data.location.city);
    // Map selection
    updateCoordinates(data.location.coordinates);
    // imgs step
    updateImages(data.images);
    // Description step
    updateName(data.name);
    updateDescription(data.description);
    updateGameLevel(data.game_level);
    // cancha status
    updatePlaceType(data.place_type);
    updateRoof(data.roof);
    updateFloorType(data.floor_type);
    // schedules step
    data.schedules.map((schedule) => {
      updateSchedule(schedule);
    });
    // services step
    updateWifi(data.services.wifi);
    updateBathroom(data.services.bathroom);
    updateTransport(data.services.transport);
    updateShop(data.services.shop);

    updateId(data.id);
    updateOwner(data.owner);
    setLoading(false);
  }

  useEffect(() => {
    fillCourtState(courtData);
  }, [courtData]);

  return { loading };
}
