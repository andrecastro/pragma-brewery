docker run --rm -it -v $PWD:/app -w /app -p 3002:3002 node:9.4.0-alpine apk add && $@
