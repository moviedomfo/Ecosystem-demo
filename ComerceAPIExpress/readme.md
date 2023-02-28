# Project comerce express

API Gateway to take all messages from any publisher and send to correspondient kafka topic

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

This POST enpoints recive an input with this format:

```
{
  "origin": "POSTMAN",
  "content": "any related json to /comerce/xxxxx use case",
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
    docker run -d -p 3008:3008 --name express_comercepub moviedomfo/express_comercepub
```

- Navigate to this url to check the if correctly docker container is running
  http://localhost:3008

# swagger & tsoa

Para documentar los controllers debemos usar tsoa
"build-tsoa": "tsoa spec-and-routes" genera las Rutas en base a los controllers documentados con los docoradores tsoa
"predev": "npm run swagger", genera el json para que swagger levante la pagina con la documentacion

Hay que ver que tenemos configurado en ./tsoa.json para ver el destino de la transpilacion de las rutas

# RegisterRoutes

To generate Routes class run
`      pnpm build-tsoa  
 `

## Important packages used in this app

sequelize, tedious,
