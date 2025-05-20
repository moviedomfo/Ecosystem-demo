# Project Commerce express

API Gateway to take all messages from any publisher and send to corespondents kafka topic

## Table of Contents

- [Intro](#Intro)
- [Push message to kafka topic ](#Push-message-to-kafka-topic)
- [Database](#mongodb-hosted)
- [Run locally](#Run-locally)
- [Dockerize](#Dockerize)

## Intro

This API provide two principal enpoints:

## Push message to kafka topic

- %URL_BASE%/api/persons/customers
- %URL_BASE%/api/persons/persons
- %URL_BASE%/api/products

This POST endpoints recive an input with this format:

```
{
  "origin": "POSTMAN",
  "content": "any related json to /commerce/xxxxx use case",
}

```

## Run locally

[1] Firs clone the repo locally
[2] run -> pnpm install or yarn install
[3] run dev command

    ```
        yarn dev
    ```

[4] Additionally if you have dockerhub installed. We leave you a dockerfil ready!!
pleasse ref to [Dockerize](#Dockerize)

# Microservices

## Dockerize

You can use docker to deploy the api server. In this releasse we leave a dockerfile and a docker compose ready to use

- generate image

```
    docker image build -t moviedomfo/express_comerce .
```

- run container

```
    docker run -d -p 3026:3016 --name express_comerce moviedomfo/express_comerce
```

## Run the application using Docker Compose

```
    docker-compose up -d
```

- which volume:
  First you need to create the maping in thge docker compose files for each container that you need
  volumes:

  - /e/volumens/express/orders:/app/files

  run container maping to comerce_files created volume

- Navigate to this url to check the if correctly docker container is running
  http://localhost:3008

# swagger & tsoa

Para documentar los controllers debemos usar tsoa
"build-tsoa": "tsoa spec-and-routes" genera las Rutas en base a los controllers documentados con los docoradores tsoa
"predev": "npm run swagger", genera el json para que swagger levante la pagina con la documentacion

Hay que ver que tenemos configurado en ./tsoa.json para ver el destino de la transpilacion de las rutas

# RegisterRoutes

To generate Routes class run
`  pnpm build-tsoa`

## Important packages used in this app

sequelize, tedious,


#server.ts

🧠 ¿Por qué creamos server.ts?
🎯 Objetivo:
Separar la carga de paths alias (tsconfig-paths) del archivo principal index.ts, para evitar errores al correr ts-node en desarrollo sin depender de module-alias.
🧩 Problema original
Tu index.ts tenía:
  import "module-alias/register";

Y eso hace que, al hacer yarn dev, module-alias intente resolver paths como @common/... hacia dist/, cuando todavía ni existe esa carpeta porque no hiciste el build.

Resultado: MODULE_NOT_FOUND

En desarrollo (yarn dev) usamos tsconfig-paths (alias vía tsconfig.json)

En producción (yarn build && yarn start) usamos tsc-alias + module-alias y dist/ ya existe

Y Nodemon automáticamente detecta .ts y usa ts-node si encuentra una línea como esta en tu script:

import "tsconfig-paths/register";
