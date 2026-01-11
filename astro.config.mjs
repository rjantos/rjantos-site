import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const ALLOWED_PATHS = new Set([
  "/",
  "/about",
  "/contact",
]);

export default defineConfig({
  site: "https://rjantos.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
  ],
});
