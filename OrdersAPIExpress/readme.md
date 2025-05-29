# Orders express

API Gateway to take all messages from any publisher and send to correspondient kafka topic.

This API store all arrived orders in mongo db, next, emit an event to send to kafka an CreateOrderEvent

This enqueueds messages will be recibed for those subscribers who requiere it. For example comerce-susbcriber that need to sincronize whitc its own SQLServer database

## Table of Contents

- [Intro](#intro)
- [Push message to kafka topic](#Push-message-to-kafka-topic)
- [Database](#mongodb-hosted)
- [Run locally](#run-locally)
- [Dockerize](#dockerize)
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
[2] run -> yarn install
[3] run dev command

    ```
        yarn  dev
    ```

[4] Additionally if you have dockerhub installed. We leave you a dockerfil ready!!
pleasse ref to [Dockerize](#dockerize)

# Microservices

## Dockerize

You can use docker to deploy the api server. In this releasse we leave a dockerfile and a docker compose ready to use

### generate image

```
    docker image build -t moviedomfo/eco-api-orders .

```

### run a single container whitout reverse proxy

```
    docker run -d -p 3009:3009 --name eco-api-orders moviedomfo/eco-api-orders
```

- Navigate to this url to check the if correctly docker container is running
  <http://localhost:3009>

## Run the application using Docker Compose

```
    docker-compose up -d
```

# Kafka

Apache Kafka is a distributed streaming platform designed to build real-time pipelines and can be used as a message
broker or as a replacement for a log aggregation solution for big data applications
