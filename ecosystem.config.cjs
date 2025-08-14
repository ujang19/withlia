// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "withlia-astro",
      cwd: ".",
      script: "./node_modules/.bin/http-server",
      // Serve static files from dist folder with http-server
      args: "dist -p 4322 -a 0.0.0.0 --cors",
      exec_mode: "fork",
      instances: 1,
      watch: false,
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
