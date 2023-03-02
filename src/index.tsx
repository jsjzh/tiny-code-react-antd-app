import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter, MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import App from "@/pages/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <SWRConfig>
        <App />
      </SWRConfig>
    </HashRouter>
  </React.StrictMode>
);
