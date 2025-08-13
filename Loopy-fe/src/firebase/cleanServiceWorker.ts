export const cleanUpServiceWorkers = async () => {
  if (import.meta.env.DEV && 'serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      const scriptUrl =
        registration.active?.scriptURL ||
        registration.installing?.scriptURL ||
        registration.waiting?.scriptURL ||
        "";

      if (!scriptUrl.includes("firebase-messaging-sw.js")) {
        registration.unregister();
      }
    }
  }
};
