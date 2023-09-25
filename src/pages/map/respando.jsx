<Map
  OnClick={HandleMapClick}
  mapRef={mapRef}
  mapPosition={mapPosition}
  zoomLevel={mapZoom}
  CourtsMarkers={courtsList.map(
    (
      court // renderizar listado de canchas
    ) => (
      <Marker
        key={court.court_id}
        position={court.coordinates}
        icon={CourtMarkerIcon}
        eventHandlers={{
          click: (e) => handleMarkerClick(court.court_id),
        }}
      >
        <Popup minWidth={300}>
          {courtSelected ? (
            <CourtCard
              courtData={courtSelected}
              showDeleteButton={false}
              showCloseButton={false}
            />
          ) : (
            <Loader />
          )}
        </Popup>
      </Marker>
    )
  )}
  singleMarker={
    user.location && <UserPositionMarker markerPosition={user.location} />
  }
/>;
