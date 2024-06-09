FROM node:18.17.1-alpine3.18 as build-ui
WORKDIR /app
COPY ui .
run npm install && npm run build

FROM node:18.17.1-alpine3.18 as build-srv
WORKDIR /app
COPY server .
RUN npm install \
    && npm run build \
    && rm -rf node_modules \
    && npm install --production
    
FROM node:18.17.1-alpine3.18 as release
WORKDIR /app
COPY --from=build-srv /app /app
COPY --from=build-ui /app/dist /app/dist/public
RUN npm install -g npm
EXPOSE 3000
CMD ["node", "dist/app.js"]