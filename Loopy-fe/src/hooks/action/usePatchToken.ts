import { getToken } from "firebase/messaging";
import { messagingPromise } from "../../firebase/firebase-config";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const requestFcmToken = async (): Promise<string | null> => {
  const messaging = await messagingPromise;
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("알림 권한 거부");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),
    });

    if (token) {
      console.log("FCM 토큰 발급:", token);
      return token;
    }

    return null;
  } catch (err) {
    console.error("FCM 토큰 요청 실패:", err);
    return null;
  }
};
