FROM node:16-bullseye AS base

WORKDIR /source
COPY . .
RUN npm install

FROM base AS build
RUN npm run build

FROM node:16-bullseye-slim

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

WORKDIR /app

COPY --from=build /source/dist /source/package.json /source/package-lock.json ./

RUN npm install --only=production

CMD ["node", "server.js"]
