docker run --rm -it -v $PWD:/app -w /app -p 3000:3000 node:9.4.0-alpine apk add && $@
