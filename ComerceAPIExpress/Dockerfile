# BUILD STEP
FROM node:23.11.1-alpine AS build

WORKDIR /app
# Copiamos solo lo necesario para instalar dependencias
COPY package.json yarn.lock tsoa.json tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY ./src ./src
COPY ./tsconfig.json ./

RUN yarn build:docker

# ADD ./dist ./dist
# CREATE IMAGE STEP
FROM node:23.11.1-alpine
LABEL maintainer="@moviedo"

WORKDIR /app

# copia los archivos compilados y node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
ADD ./.env.production ./.env

# ENV PORT 3008
# ENV PM2_HEALTH_PORT 3001
ENV NODE_ENV=production

# EXPOSE ${PORT}
# EXPOSE ${PM2_HEALTH_PORT}
CMD ["node", "dist/index.js"]





