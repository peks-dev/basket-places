'use client';

import { useState, useEffect } from 'react';
import { BaseMap, BaseDraggableMarker } from '@/app/(main)/map';
import type { Coordinates } from '@/comunidad/types';
import { useContributionStore } from '@/contribuir/stores/useContributionStore';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { StepHelp } from '../StepHelp';
import { STEP_HELP } from '../stepHelpContent';

const DEFAULT_LOCATION: Coordinates = {
  lat: 20.9674,
  lng: -89.5926,
};

export default function LocationStep() {
  const { location, updateFormField } = useContributionStore();

  const [currentPosition, setCurrentPosition] = useState<Coordinates>(
    location || DEFAULT_LOCATION
  );
  const debouncedPosition = useDebounce(currentPosition, 750);

  useEffect(() => {
    if (
      debouncedPosition &&
      (debouncedPosition.lat !== location?.lat ||
        debouncedPosition.lng !== location?.lng)
    ) {
      updateFormField('location', debouncedPosition);
    }
  }, [debouncedPosition, location, updateFormField]);

  const handleMarkerDrag = (coords: Coordinates) => {
    setCurrentPosition(coords);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 right-4 left-4">
        <StepHelp {...STEP_HELP.location} />
      </div>

      <BaseMap center={[currentPosition.lat, currentPosition.lng]} zoom={11}>
        <BaseDraggableMarker
          initialPosition={currentPosition}
          onDragEnd={handleMarkerDrag}
        />
      </BaseMap>

      <div className="bg-background-primary-dark absolute bottom-4 left-1/2 z-[1000] w-11/12 -translate-x-1/2 rounded-lg p-3 text-center shadow-lg">
        <h3 className="text-text-primary font-semibold">Mueve el marcador</h3>
      </div>
    </div>
  );
}
