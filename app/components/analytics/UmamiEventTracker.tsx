'use client';

import { useEffect } from 'react';
import {
  trackAnalyticsEvent,
  type AnalyticsEventName,
} from '@/lib/analytics/umami';

interface UmamiEventTrackerProps {
  eventName: AnalyticsEventName;
  data?: Record<string, string | number | boolean | null>;
}

export function UmamiEventTracker({ eventName, data }: UmamiEventTrackerProps) {
  useEffect(() => {
    trackAnalyticsEvent(eventName, data);
  }, [eventName, data]);

  return null;
}
