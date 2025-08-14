#!/usr/bin/env node

// Set environment variables to disable host checking
process.env.DANGEROUSLY_DISABLE_HOST_CHECK = 'true';
process.env.VITE_ALLOWED_HOSTS = 'withlia.id';

// Import and run astro preview
const { spawn } = require('child_process');

const child = spawn('npm', ['run', 'preview', '--', '--host', '0.0.0.0', '--port', '4322'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DANGEROUSLY_DISABLE_HOST_CHECK: 'true',
    VITE_ALLOWED_HOSTS: 'withlia.id'
  }
});

child.on('exit', (code) => {
  process.exit(code);
});
