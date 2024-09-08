#!/bin/bash
# Navigate to the server directory
cd server

# Install server dependencies
npm install

# Start the Node.js server with PM2
pm2 start server.js --name 'AITOOLS4ALL_server'
