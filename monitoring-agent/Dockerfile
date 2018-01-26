FROM node:9.4.0-alpine

LABEL "mantainer"="Andre Castro"
LABEL "email"="andrecoelho03@gmail.com"
LABEL "version"="0.0.1"

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN apk add --no-cache git && yarn install

COPY ./app.js .
COPY ./service ./service

ENTRYPOINT ["node", "app.js"]
