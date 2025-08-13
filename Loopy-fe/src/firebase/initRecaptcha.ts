import { getAuth, RecaptchaVerifier } from "firebase/auth";

export const initializeRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    const container = document.getElementById("recaptcha-container");
    if (!container) {
      const newContainer = document.createElement("div");
      newContainer.id = "recaptcha-container";
      newContainer.style.display = "none";
      document.body.appendChild(newContainer);
    }

    const auth = getAuth();

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("reCAPTCHA 응답:", response);
        },
      },
    );

    window.recaptchaVerifier.render().then((widgetId: string) => {
      console.log("reCAPTCHA 렌더 완료:", widgetId);
    });
  }
};
