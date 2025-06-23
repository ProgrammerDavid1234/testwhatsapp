# Use a Puppeteer-friendly base image with Chromium installed
FROM ghcr.io/puppeteer/puppeteer:latest

# Set working directory
WORKDIR /app

# Copy your files
COPY . .

# Prevent wa-automate from modifying .gitignore
ENV WA_NO_IGNORE=true

# Install dependencies
RUN npm install

# Start the bot
CMD ["npm", "start"]
