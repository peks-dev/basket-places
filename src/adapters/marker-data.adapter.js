export function markerDataAdapter(courtsData) {
  return courtsData.map((court, index) => {
    const dataAdapted = {
      court_id: court.court_id,
      coordinates: {
        lat: court.lat,
        lng: court.lng,
      },
    };
    return dataAdapted;
  });
}
