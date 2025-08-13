import { useCallback, useRef, useState } from "react";
import { requestFcmToken as requestFromBrowser } from "./usePatchToken";
import { usePatchFcmToken } from "../mutation/fcm/usePatchFcmToken";

type RequestOptions = { force?: boolean };

export const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const isRequestedRef = useRef(false);
  const inFlightRef = useRef<Promise<string | null> | null>(null);

  const { mutateAsync: patchFcmTokenAsync, isPending: isPatching } = usePatchFcmToken();

  const reset = useCallback(() => {
    isRequestedRef.current = false;
    inFlightRef.current = null;
    setFcmToken(null);
    setError(null);
  }, []);

  const requestFcmToken = useCallback(
    async (opts: RequestOptions = {}): Promise<string | null> => {
      const { force = false } = opts;

      if (!force && fcmToken) return fcmToken;

      if (inFlightRef.current) return inFlightRef.current;

      if (!force && isRequestedRef.current) return fcmToken;

      const promise = (async () => {
        try {
          const token = await requestFromBrowser();
          if (!token) {
            isRequestedRef.current = true; 
            return null;
          }

          setFcmToken(token);
          isRequestedRef.current = true;

          try {
            await patchFcmTokenAsync({ fcmToken: token });
          } catch (e) {
            setError(e as Error);
          }

          return token;
        } catch (e) {
          setError(e as Error);
          isRequestedRef.current = true;
          return null;
        } finally {
          inFlightRef.current = null;
        }
      })();

      inFlightRef.current = promise;
      return promise;
    },
    [fcmToken, patchFcmTokenAsync]
  );

  const isRequesting = !!inFlightRef.current;

  return { fcmToken, requestFcmToken, reset, isRequesting, isPatching, error };
};
