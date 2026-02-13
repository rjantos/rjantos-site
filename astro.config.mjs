import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const EXCLUDED_SITEMAP_PATHS = new Set([
  "/404",
  "/404/",
  "/rss.xml",
  "/rss.xml/",
]);

export default defineConfig({
  site: "https://rjantos.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED_SITEMAP_PATHS.has(page),
    }),
  ],
});
