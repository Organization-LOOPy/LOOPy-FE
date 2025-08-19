import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase-config";

let verifier: RecaptchaVerifier | null = null;
let widgetId: number | null = null;

export function ensureRecaptcha(): RecaptchaVerifier {
  if (!verifier) {
    verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "normal",
    });
  }
  return verifier;
}

export async function resetRecaptcha() {
  try {
    if (!verifier) return;
    if (widgetId === null) {
      widgetId = await verifier.render();
    }
    // @ts-ignore
    if (window.grecaptcha && typeof window.grecaptcha.reset === "function" && widgetId !== null) {
      window.grecaptcha.reset(widgetId);
    } else {
      verifier.clear();
      verifier = null;
    }
  } catch {
    verifier?.clear();
    verifier = null;
  }
}
