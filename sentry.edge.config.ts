import * as Sentry from '@sentry/nextjs';

const dsn = process.env.GLITCHTIP_DSN ?? process.env.NEXT_PUBLIC_GLITCHTIP_DSN;

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA,

  // Privacidad mínima para beta: solo error monitoring.
  sendDefaultPii: false,
  tracesSampleRate: 0,

  beforeSend(event) {
    delete event.user;

    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }

    return event;
  },
});
