# Build Stage 1
FROM node:14.5.0-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./src ./src
COPY ./babel.config.js ./
COPY ./nginx/nginx.conf ./nginx
COPY ./tsconfig.json ./

RUN yarn build

# COPY ./dist ./dist


# Build Stage 2 prod
FROM node:14.5.0-alpine
LABEL maintainer="Pelsoft SF by @moviedo"
WORKDIR /app
COPY package.json ./
COPY ./babel.config.js ./
RUN npm install --production
# copia los archivos compilados y node_modules
COPY --from=build /app/dist .
# COPY --from=build /app/node_modules ./node_modules


ADD ./.env.production ./.env
ENV NODE_ENV production
EXPOSE ${PORT}

CMD  node index.js





