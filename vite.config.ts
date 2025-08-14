import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // Allow reverse-proxy host
    allowedHosts: ["withlia.id"],
    // Listen on all interfaces (useful behind Nginx/PM2)
    host: true
  },
  preview: {
    // Allow reverse-proxy host for preview server
    allowedHosts: ["withlia.id"],
    // Listen on all interfaces (useful behind Nginx/PM2)
    host: true
  }
});