# Kafka express

API Gateway to take all messages from any publisher and send to correspondient kafka topic

## Table of Contents

- [Intro](#Intro)
- [Push message to kafka topic ](#Push-message-to-kafka-topic)
- [Database](#mongodb-hosted)
- [Run locally](#Run-locally)
- [Dockerize](#Dockerize)
- [Validation](#Validation-Chain-API)

## Intro

This API provide two principal enpoints:

## Push message to kafka topic & store it in mongodb

- %URL_BASE%/api/orders

This POST enpoint recive an input with this format:

```
{
  "key": "2",
  "topic": "orders",
  "content": "{order-body}",
  "type": 1
}

```

## Run locally

[1] Firs clone the repo locally
[2] run -> pnpm install or yarn install
[3] run dev command

    ```
        pnpm run dev
    ```

[4] Additionally if you have dockerhub installed. We leave you a dockerfil ready!!
pleasse ref to [Dockerize](#Dockerize)

# Microservices

## Dockerize

You can use docker to deploy the api server. In this releasse we leave a dockerfile and a docker compose ready to use

- generate image

```
    docker image build -t moviedomfo/express_orderpub .

```

- run container

```
    docker run -d -p 3018:3018 --name express_orderpub moviedomfo/express_orderpub
    docker run -d -p 3019:3019 --name express_orderpub2 moviedomfo/express_orderpub2
```

- Navigate to this url to check the if correctly docker container is running
  http://localhost:3018

## Run the application using Docker Compose

```
    docker-compose up -d
```

# Kafka docker images

Apache Kafka is a distributed streaming platform designed to build real-time pipelines and can be used as a message
broker or as a replacement for a log aggregation solution for big data applications

We use Apache Kafka packaged by Bitnami

### We use local docker-compose.yml content what should it contain this

```
    zookeeper:
        image: docker.io/bitnami/zookeeper:3.8
        ports:
        - "2181:2181"
        volumes:
        - "zookeeper_data:/bitnami"
        environment:
        - ALLOW_ANONYMOUS_LOGIN=yes
    kafka:
        image: docker.io/bitnami/kafka:3.2
        ports:
        - "9092:9092"
        volumes:
        - "kafka_data:/bitnami"
        environment:
        - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
        - ALLOW_PLAINTEXT_LISTENER=yes
        depends_on:
        - zookeeper
```

To run docker compose:

1. Start and restart all the services defined in yaml

```
     docker-compose up -d
```

2. Below command will stop running containers, but it also removes the stopped containers as well as any networks that were created.
   And.. for to remove vulumes append -v flag

```
    docker-compose down
    or
    docker-compose down -v
```

     1) docker-compose -f docker-compose-kafka.yml down
     2) docker-compose up -d

### kafka documentations

    https://www.npmjs.com/package/kafkajs
    https://www.youtube.com/watch?v=EiDLKECLcZw

### kafka packages

    yarn add kafkajs
    this trow this error ✕ missing peer openapi-types@>=7...so you have to install

        pnpm openapi-types@>=7

    yarn add @kafkajs/confluent-schema-registry

## Validation Chain API

    - doc ->[here](https://express-validator.github.io/docs/validation-chain-api/)

    The validation chain is a middleware, and it should be passed to an Express route handler.
    You can add as many validators and sanitizers to a chain as you need.

    check('email').normalizeEmail().isEmail(),
    check('date-of-birth').isISO8601().toDate(),
    check('date').isISO8601().toDate()
            .withMessage("Invalid day received")

    await check('email').isEmail().run(req);
    await check('password').isLength({ min: 6 }).run(req);
