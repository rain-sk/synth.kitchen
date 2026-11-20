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

FROM nginx:alpine AS serve

RUN apk update && apk upgrade --no-cache && apk add --no-cache nodejs tini python3 py3-pip
RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir supervisor \
    && ln -s /opt/venv/bin/supervisord /usr/local/bin/supervisord \
    && ln -s /opt/venv/bin/supervisorctl /usr/local/bin/supervisorctl \
    && apk del py3-pip

COPY --from=build /src/app/api/build /usr/src/api
COPY --from=build /src/app/web/build /usr/share/nginx/html

WORKDIR /usr/src/api

COPY app/api/package.json app/api/package-lock.json ./
COPY app/shared/package.json /usr/src/shared/package.json
COPY submodules/server-name-gen /usr/submodules/server-name-gen

RUN apk add --no-cache npm \
    && npm ci --omit=dev --no-audit --no-fund \
    && apk del npm \
    && rm -rf node_modules/typescript node_modules/ts-node

COPY app/api/scripts/check-externals.js /tmp/check-externals.js
RUN node /tmp/check-externals.js /usr/src/api/index.js && rm /tmp/check-externals.js

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
