FROM node:9.4.0-alpine

LABEL "mantainer"="Andre Castro"
LABEL "email"="andrecoelho03@gmail.com"
LABEL "version"="0.0.1"

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN apk add --no-cache git && yarn install

COPY ./public ./public
COPY ./views ./views
COPY ./app.js .

# Copy vendor styles
RUN cp ./node_modules/bootstrap/dist/css/bootstrap.min.css ./public/css/vendor

# Copy vendor js
RUN cp ./node_modules/bootstrap/dist/js/bootstrap.min.js ./public/js/vendor && \
    cp ./node_modules/backbone/backbone-min.js ./public/js/vendor && \
    cp ./node_modules/jquery/dist/jquery.min.js ./public/js/vendor && \
    cp ./node_modules/requirejs/require.js ./public/js/vendor && \
    cp ./node_modules/text/text.js ./public/js/vendor && \
    cp ./node_modules/underscore/underscore-min.js ./public/js/vendor

ENTRYPOINT ["node", "app.js"]
