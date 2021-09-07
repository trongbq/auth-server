FROM node:16-bullseye AS base

WORKDIR /build
COPY . .
RUN npm install

FROM base AS build
RUN npm run build

FROM node:16-bullseye-slim

EXPOSE 8080

ENV PORT 8080
ENV NODE_ENV production

WORKDIR /app

COPY --from=build /build/dist /build/package.json /build/package-lock.json ./
COPY --from=build /build/bin ./bin

RUN npm install --only=production

CMD ["/app/bin/www"]
