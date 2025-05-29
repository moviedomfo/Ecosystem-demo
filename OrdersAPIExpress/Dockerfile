# Build Stage 1
FROM node:23.11.1-alpine AS build

WORKDIR /app
# Copiamos solo lo necesario para instalar dependencias
COPY package.json yarn.lock tsoa.json tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY ./src ./src
COPY ./tsconfig.json ./

RUN yarn build:docker

# Build Stage 2 prod
FROM node:23.11.1-alpine
LABEL maintainer="@moviedo"

WORKDIR /app

# copia los archivos compilados y node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
ADD ./.env.production ./.env

ENV NODE_ENV=production
EXPOSE ${PORT}

# CMD  node index.js
CMD ["node", "dist/index.js"]






