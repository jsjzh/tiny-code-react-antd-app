import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "@/pages/App";

import { SWRConfig } from "swr";

import { ConfigProvider } from "antd";
// import zhCN from "antd/es/locale/zh_CN";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <App />
      </SWRConfig>
    </ConfigProvider>
  </HashRouter>,
);
