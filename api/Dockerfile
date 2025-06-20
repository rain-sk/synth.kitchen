FROM node:21-bullseye-slim AS base

FROM base AS builder

WORKDIR /usr/src
COPY . .
RUN npm ci
RUN npm run build
RUN npm run migrate


FROM base AS server

RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY --from=builder /usr/src/node_modules /usr/src/node_modules
COPY --from=builder /usr/src/build /usr/src

EXPOSE 3000

WORKDIR /usr/src
CMD [ "node", "./index.js" ]