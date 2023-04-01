import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter, MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import App from "@/pages/App";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <App />
      </SWRConfig>
    </HashRouter>
  </React.StrictMode>,
);
