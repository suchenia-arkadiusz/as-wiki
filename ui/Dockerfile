FROM node:18.17.1-alpine3.18 as build
ARG VITE_APP_API_URL
WORKDIR /app
COPY . .
RUN npm install \
  && VITE_APP_API_URL="" npm run build

FROM nginx:1.21.3-alpine as release
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
