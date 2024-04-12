import React from "react";

// components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import Map from "@/components/map/map";
import CourtMarker from "../../../../../../components/court-marker/court-marker";

const LocationTab = ({ courtData }) => {
  return (
    <TabWrapper variant={"tab-location"}>
      <Map mapPosition={courtData.location.coordinates} zoomLevel={15}>
        <CourtMarker markerPosition={courtData.location.coordinates} />
      </Map>
    </TabWrapper>
  );
};

export default LocationTab;
