FROM node:latest

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN npm install --production

RUN npm install -g typescript

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["yarn", "start"]
