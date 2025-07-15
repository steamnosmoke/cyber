import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr  from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      // "@": "/src",
      "components": "/src/components",
      "assets": "/src/assets",
      // "styles": "/src/styles",
      "stores": "/src/zustand",
      "hooks": "/src/hooks",
      // "utils": "/src/utils",
      // "pages": "/src/pages",
      "buttons": "/src/components/buttons",
      "categoriesImages": "/src/pages/ChoosingCategories/images"
      
      
    },
  },
});
