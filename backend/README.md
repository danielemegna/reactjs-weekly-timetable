# TBC

# Dev

```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:lts bash
# yarn install
# yarn nodemon -e ts --exec "(yarn tsc && node ./dist/start.js) || (sleep 10)"
```

# Prod
```
$ docker run --rm -it -p 8125:8125 -v $PWD:/app -w /app node:lts bash
# yarn install
# yarn tsc
# yarn install --prod
# node ./dist/start.js
```
