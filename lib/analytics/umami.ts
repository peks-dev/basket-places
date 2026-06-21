export type AnalyticsEventName =
  | 'auth_sign_in_started'
  | 'auth_sign_in_completed'
  | 'contribution_started'
  | 'contribution_submitted'
  | 'community_viewed'
  | 'review_submitted'
  | 'feedback_submitted';

type AnalyticsEventData = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: AnalyticsEventData) => void;
    };
  }
}

export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  data?: AnalyticsEventData
) {
  if (typeof window === 'undefined') return;

  window.umami?.track(name, data);
}
