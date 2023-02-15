import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import { BrowserRouter, HashRouter, MemoryRouter } from "react-router-dom";

import App from "@/pages/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
