# Build Stage 1
FROM node:14.5.0-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./src ./src
COPY ./babel.config.js ./
COPY ./tsconfig.json ./

RUN yarn build


# Build Stage 2 prod
FROM node:14.5.0-alpine
LABEL maintainer="@moviedo"

WORKDIR /app

# copia los archivos compilados y node_modules
COPY --from=build /app/dist .
COPY --from=build /app/package*.json .
COPY --from=build /app/node_modules ./node_modules
ADD ./.env.production ./.env

ENV NODE_ENV production
EXPOSE ${PORT}

CMD  node index.js





