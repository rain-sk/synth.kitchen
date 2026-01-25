FROM node:alpine AS build


WORKDIR /src
COPY app/ ./app/
COPY submodules/ ./submodules/
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

WORKDIR /src
RUN npm run build:prod
RUN rm -f /src/app/api/.env*

WORKDIR /src/app/api
RUN npm uninstall @types/bcrypt @types/cors @types/express @types/node concurrently esbuild ts-node typescript class-validator cors pg-hstore reflect-metadata


FROM nginx:alpine AS serve

RUN apk add --no-cache nodejs tini python3 py3-pip
RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir supervisor \
    && ln -s /opt/venv/bin/supervisord /usr/local/bin/supervisord \
    && ln -s /opt/venv/bin/supervisorctl /usr/local/bin/supervisorctl \
    && apk del py3-pip

COPY --from=build /src/app/api/node_modules /usr/src/api/node_modules
COPY --from=build /src/app/api/build /usr/src/api
COPY --from=build /src/app/web/build /usr/share/nginx/html
COPY submodules/server-name-gen/dist /usr/src/api/node_modules/server-name-gen/dist/
COPY submodules/server-name-gen/package.json /usr/src/api/node_modules/server-name-gen/package.json
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

WORKDIR /usr/src/api
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]