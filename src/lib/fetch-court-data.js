import { useState } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// models
import CourtModel from "@/models/court.model.js";
import { ConnectionError } from "@/models/errors.model";

export function useFetchCourtData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courtInfo, setCourtInfo] = useState(null);

  async function fetchAllCourtData(courtId) {
    setLoading(true);
    let courtData = new CourtModel();
    try {
      const initialData = await fetchDataOnTable("courts", "id", courtId);

      const {
        owner,
        name,
        description,
        game_level,
        place_type,
        floor_type,
        roof,
        id,
        images,
      } = initialData[0];
      // transpasar datos
      courtData.id = id;
      courtData.owner = owner;
      courtData.name = name;
      courtData.description = description;
      courtData.game_level = game_level;
      courtData.place_type = place_type;
      courtData.floor_type = floor_type;
      courtData.roof = roof;

      // fetch table locations
      const locationData = await fetchDataOnTable(
        "locations",
        "court_id",
        initialData.id
      );

      const { lat, lng, country, state, city } = locationData[0];

      courtData.location.coordinates = { lat, lng };
      courtData.location.country = country;
      courtData.location.state = state;
      courtData.location.city = city;

      // Create img urls
      images.map((image) => {
        const imageUrl = `https://rkmuvbbnbbajhimhcxmq.supabase.co/storage/v1/object/public/imgs_courts/${owner}/${id}/${image}`;
        courtData.images.push(imageUrl);
      });

      // Fetch table raitings

      // Fetch table schedules
      const schedules = await fetchDataOnTable("schedules", "court_id", id);
      schedules.map((schedule) => {
        let scheduleSet = { days: schedule.days, time: schedule.time };
        courtData.schedules.push(scheduleSet);
      });

      // Fetch table services
      const services = await fetchDataOnTable("services", "court_id", id);
      const { transport, bathroom, wifi, shop } = services[0];

      courtData.services.transport = transport;
      courtData.services.bathroom = bathroom;
      courtData.services.wifi = wifi;
      courtData.services.shop = shop;

      setCourtInfo(courtData);
    } catch (error) {
      if (error.message === "TypeError: Failed to fetch") {
        setError(
          new ConnectionError("no pudo obtenerse los datos, revisa tu conexion")
        );
      } else {
        setError(new Error("algo salio mal, intentalo mas tarde"));
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, fetchAllCourtData, courtInfo };
}
