FROM node:alpine AS build


WORKDIR /src
COPY lib/shared/ ./lib/shared/
COPY api/ ./api/
COPY app/ ./app

WORKDIR /src/lib/shared
RUN npm ci

WORKDIR /src/api
RUN npm ci
COPY .env* .
RUN npm run build:prod

WORKDIR /src/app
RUN npm ci
RUN npm run build:prod


FROM nginx:alpine AS serve
RUN apk add --no-cache nodejs tini supervisor

WORKDIR /usr/src/api
COPY --from=build /src/api/node_modules /usr/src/api/node_modules
COPY --from=build /src/api/build /usr/src/api

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/app/build /usr/share/nginx/html

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf", "-n"]