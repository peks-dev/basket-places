import { useState, useEffect } from "react";
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
import CourtModel from "@/models/court.model.js";
import { useAsyncError } from "react-router-dom";

export function useAdaptCourtData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [court, setCourt] = useState(null);

  async function consolidateCourtData(initialData) {
    let courtData = new CourtModel();
    const {
      owner,
      name,
      description,
      game_level,
      place_type,
      floor_type,
      roof,
    } = initialData[0];
    try {
      // transpasar datos
      courtData.owner = owner;
      courtData.name = name;
      courtData.description = description;
      courtData.game_level = game_level;
      courtData.place_type = place_type;
      courtData.floor_type = floor_type;
      courtData.roof = roof;

      // fetch tabla locations
      const locationData = await fetchDataOnTable(
        "locations",
        "court_id",
        initialData.id
      );
      const { lat, lng, country, state, city } = locationData;

      courtData.location.coordinates = { lat, lng };
      courtData.location.country = country;
      courtData.location.state = state;
      courtData.location.city = city;

      // Crear url de imagenes
      initialData[0].images.map((image) => {
        const imageUrl = `https://rkmuvbbnbbajhimhcxmq.supabase.co/storage/v1/object/public/imgs_courts/${initialData.owner}/${initialData.id}/${image}`;
        courtData.images.push(imageUrl);
      });

      // Fetch table raitings

      // Fetch table schedules
      const schedules = await fetchDataOnTable(
        "schedules",
        "court_id",
        initialData[0].id
      );
      schedules.map((schedule) => {
        let scheduleSet = { days: schedule.days, time: schedule.time };
        courtData.schedules.push(scheduleSet);
      });

      // Fetch table services
      const services = await fetchDataOnTable(
        "services",
        "court_id",
        initialData[0].id
      );
      const { transport, bathroom, wifi, shop } = services[0];

      courtData.services.transport = transport;
      courtData.services.bathroom = bathroom;
      courtData.services.wifi = wifi;
      courtData.services.shop = shop;

      setCourt(courtData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { court, consolidateCourtData, loading, error };
}
