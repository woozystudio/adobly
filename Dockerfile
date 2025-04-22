FROM node:slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN npm install --production --silent

RUN npm install -g typescript

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "start"]
