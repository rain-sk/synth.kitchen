FROM node:alpine AS build


WORKDIR /src
COPY app/shared/ ./shared/
COPY app/api/ ./api/
COPY app/web/ ./web/

WORKDIR /src/shared
RUN npm ci

WORKDIR /src/web
RUN npm ci
RUN npm run build:prod

WORKDIR /src/api
RUN npm ci
COPY .env* .
RUN npm run build:prod
RUN rm -f /src/api/.env
RUN npm uninstall @types/bcrypt @types/cors @types/express @types/node concurrently esbuild ts-node typescript class-validator cors pg-hstore reflect-metadata


FROM nginx:alpine AS serve
RUN apk add --no-cache nodejs tini supervisor

COPY --from=build /src/api/node_modules /usr/src/api/node_modules
COPY --from=build /src/api/build /usr/src/api
COPY --from=build /src/web/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

WORKDIR /usr/src/api
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf", "-n"]