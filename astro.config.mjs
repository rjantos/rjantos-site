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
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname.replace(/\/$/, "");
        return ALLOWED_PATHS.has(pathname === "" ? "/" : pathname);
      },
    }),
  ],
});
