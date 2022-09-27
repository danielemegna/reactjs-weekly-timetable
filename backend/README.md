# Frameworkless backend project

### Run it

```
$ yarn install
$ yarn tsc
$ node ./dist/start.js
```

or in dev autoreload:

```
$ yarn install
$ yarn nodemon -e ts --exec "(yarn tsc && node ./dist/start.js) || (sleep 10)"
```

### Distribution

```
$ yarn install --prod
$ node ./dist/start.js
```

### Run tests

```
$ yarn test
```

## Docker way

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

## Useful material

- https://nodejs.dev/en/learn/get-http-request-body-data-using-nodejs/