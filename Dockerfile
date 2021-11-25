FROM node:lts as builder

ARG REACT_APP_BACKEND_URL=http://localhost:8125
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

COPY . /app
WORKDIR /app
RUN yarn install && yarn build

# -----------------------

FROM nginx:alpine
COPY --from=builder /app/build/ /usr/share/nginx/html/
EXPOSE 80
