# TBC

## Dev Notes

Temporary dev node docker env with autoreload:

```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:lts bash
# yarn install
# yarn nodemon -e ts --exec "(yarn tsc && node ./dist/start.js) || (sleep 10)"
```

Production steps with temporary container:

```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:lts bash
# yarn install
# yarn tsc
# yarn install --prod
# node ./dist/start.js
```

Production ready start with Dockerfile:

```
$ docker build -t wtapi .
$ docker run --rm -dp 8125:8125 -v $PWD/store:/app/store --name wtapi wtapi
