import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeRecaptcha } from "./firebase/initRecaptcha";
import { cleanUpServiceWorkers } from "./firebase/cleanServiceWorker";

initializeRecaptcha();
cleanUpServiceWorkers();

createRoot(document.getElementById("root")!).render(
  <App />
);
