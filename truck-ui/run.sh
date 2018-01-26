docker run --rm -it -v $PWD:/app -w /app -p 3003:3003 node:9.4.0-alpine apk add && $@
