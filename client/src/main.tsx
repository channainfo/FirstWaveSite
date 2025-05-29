import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import TagManager from "react-gtm-module";

// Initialize Google Tag Manager
const tagManagerArgs = {
  gtmId: "GTM-M77DD3FX", // Replace with your GTM Container ID
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById("root")!).render(<App />);
