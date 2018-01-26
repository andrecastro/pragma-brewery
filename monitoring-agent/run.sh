docker run --rm -it -v $PWD:/app -w /app -p 3001:3001 node:9.4.0-alpine apk add && $@
