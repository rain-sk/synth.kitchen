FROM node:alpine AS api-build


WORKDIR /src

COPY lib/shared/ ./lib/shared/
COPY api/ ./api/

WORKDIR /src/lib/shared
RUN npm ci

WORKDIR /src/api
RUN npm ci
COPY .env* .
COPY api/.env* .
RUN npm run build:prod


FROM node:alpine AS app-build

WORKDIR /src
COPY app/package*.json ./app/
COPY lib/shared ./lib/shared
COPY app/ ./app

WORKDIR /src/lib/shared
RUN npm ci

WORKDIR /src/app
RUN npm ci
RUN npm run build:prod


FROM nginx:alpine AS final

RUN apk add --no-cache nodejs npm

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=app-build /src/app/dist /usr/share/nginx/html

WORKDIR /usr/src/api
COPY --from=api-build /src/api/node_modules /usr/src/api/node_modules
COPY --from=api-build /src/api/build /usr/src/api

EXPOSE 80
CMD ["sh", "-c", "node index.js & exec nginx -g 'daemon off;'"]
