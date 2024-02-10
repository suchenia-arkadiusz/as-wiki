FROM node:18.17.1-alpine3.18 as build
WORKDIR /app
COPY . .
RUN npm install \
  && npm run build \
  && rm -rf node_modules \
  && npm install --production

FROM node:18.17.1-alpine3.18 as release
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["node", "dist/app.js"]
# CMD ["npx", "db-migrate", "up", "-e", "prod", "&&", "node", "dist/app.js"]
