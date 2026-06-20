FROM node:24 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-n", "dist"]