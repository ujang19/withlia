import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://withlia.id",
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false // we'll control base styles in src/styles/globals.css
    }),
    sitemap(),
    mdx()
  ],
  vite: {
    server: {
      allowedHosts: ["withlia.id", "localhost", "127.0.0.1"],
      host: true
    },
    preview: {
      allowedHosts: true, // Allow all hosts for preview
      host: true
    }
  }
});