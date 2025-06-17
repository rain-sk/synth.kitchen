FROM node:21-bullseye-slim as base

ENV PORT=${PORT}

FROM base as builder

WORKDIR ./
COPY . .
RUN npm ci
RUN npm run build
RUN npm run migrate


FROM base

RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY --from=builder ./build /usr/src

EXPOSE ${PORT}

CMD [ "node", "/usr/src/index.js" ]