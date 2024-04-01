import React from "react";
// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
// components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import Map from "@/components/map/map";
import CourtMarker from "../../../../../../components/court-marker/court-marker";

const LocationTab = () => {
  const { courtData } = useCourtDetailsStore();

  return (
    <TabWrapper variant={"tab-location"}>
      <Map mapPosition={courtData.location.coordinates} zoomLevel={15}>
        <CourtMarker markerPosition={courtData.location.coordinates} />
      </Map>
    </TabWrapper>
  );
};

export default LocationTab;
