FROM node:alpine AS build

WORKDIR /usr/src
COPY app/package*.json ./app/
COPY lib/shared ./lib/shared
COPY app/ ./app

WORKDIR /usr/src/app
RUN npm ci
RUN npm run build:prod

FROM nginx:alpine AS server
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY app/nginx.app.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]