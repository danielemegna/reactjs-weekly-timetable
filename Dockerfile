FROM node:lts as builder
COPY . /app
WORKDIR /app
RUN yarn install && yarn build

# -----------------------

FROM nginx:alpine
COPY --from=builder /app/build/ /usr/share/nginx/html/