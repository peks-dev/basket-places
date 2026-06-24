'use client';

import { useState, useEffect } from 'react';
import { reverseGeocode } from '../services';
import type { LocationData } from '../services/reverseGeocode';
import type { Coordinates } from '@/comunidad/types';

/**
 * Hook para manejar geocodificación con estado React
 * Proporciona loading, error y datos de ubicación
 */
export function useGeocoding(coordinates: Coordinates | null) {
  const [address, setAddress] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAddress = async () => {
      if (!coordinates) {
        if (!cancelled) {
          setAddress(null);
          setError(null);
        }
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await reverseGeocode(coordinates.lat, coordinates.lng);
        if (!cancelled) setAddress(result);
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
          setAddress(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchAddress();

    return () => {
      cancelled = true;
    };
  }, [coordinates]);

  return { address, isLoading, error };
}
