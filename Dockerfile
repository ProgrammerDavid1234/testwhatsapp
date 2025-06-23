FROM node:20

WORKDIR /app

COPY . .

RUN chown -R node:node /app

USER node

RUN npm install

CMD ["node", "wa-automate-server.js"]
