import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      store: path.resolve(__dirname, "src/app/store"),
      hooks: path.resolve(__dirname, "src/app/hooks"),
      types: path.resolve(__dirname, "src/app/types"),

      features: path.resolve(__dirname, "src/features"),
      pages: path.resolve(__dirname, "src/pages"),

      assets: path.resolve(__dirname, "src/shared/assets"),
      constants: path.resolve(__dirname, "src/shared/constants"),
      components: path.resolve(__dirname, "src/shared/components"),

      buttons: path.resolve(__dirname, "src/shared/components/buttons"),
    },
  },
});
