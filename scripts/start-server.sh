#!/bin/bash

# Navigate to the client directory
cd ../client || { echo "Client directory not found"; exit 1; }

# Build the React app
npm run build || { echo "Failed to build React app"; exit 1; }

# Navigate to the server directory
cd ../server || { echo "Server directory not found"; exit 1; }

# Create the public directory if it does not exist
mkdir -p public

# Move build files to server public directory
cp -r ../client/build/* public/ || { echo "Failed to copy build files"; exit 1; }

# Install server dependencies
npm install || { echo "Failed to install server dependencies"; exit 1; }

# Start the Node.js server with PM2
pm2 start server.js --name 'AI-Tools_app' || { echo "Failed to start server with PM2"; exit 1; }
