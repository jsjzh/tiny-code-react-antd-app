import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    plugins: [react()],
    resolve: { alias: { "@": path.resolve("./src") } },
    build: {
      sourcemap: config.mode !== "production",
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "react-utils-vendor": ["zustand", "use-immer", "swr"],
            "antd-vendor": ["antd", "@ant-design/icons"],
            "request-vendor": ["axios", "jsonp", "query-string"],
            "utils-vendor": ["dayjs", "immer", "ramda"],
          },
        },
      },
    },
  };
});
