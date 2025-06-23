FROM node:20

WORKDIR /app

COPY . .

# Fix permission issue
RUN chmod -R 777 /app

# Install dependencies
RUN npm install

# Start the bot
CMD ["node", "index.js"]
