import { createRoot } from "react-dom/client";
import "./index.css";
import "./analystics/mixpanel"
import App from "./App";
import { cleanUpServiceWorkers } from "./firebase/cleanServiceWorker";

cleanUpServiceWorkers();

createRoot(document.getElementById("root")!).render(
  <App />
);
