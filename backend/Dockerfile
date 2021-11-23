FROM node:lts

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn tsc
RUN yarn install --prod

EXPOSE 8125
CMD ["node", "./dist/start.js"]
