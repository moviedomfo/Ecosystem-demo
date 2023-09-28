# BUILD STEP
FROM node:14.5.0-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

# ADD ./dist ./dist
# CREATE IMAGE STEP
FROM node:14.5.0-alpine
LABEL maintainer="@moviedo"


WORKDIR /app

# copia los archivos compilados y node_modules
COPY --from=build /app/dist .
COPY --from=build /app/package*.json .
COPY --from=build /app/node_modules ./node_modules
ADD ./.env.production ./.env

# ENV PORT 3008
# ENV PM2_HEALTH_PORT 3001
ENV NODE_ENV production

# EXPOSE ${PORT}
# EXPOSE ${PM2_HEALTH_PORT}

CMD  node index.js





