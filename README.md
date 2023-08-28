# Table of Contents

- [Intro](#ecosystem_express)
- [Customers & Provider registering](#pub_persons)
- [Orders -customers online shopping](#pub_orders)
- [Products - inventory ](#pub_product)
- [Customers & Provider API](#ComerceAPIExpress)
- [Orers API](#OrdersAPIExpress)
- [Kafka & docker](#Kafka-docker-images)
- [nginx](#nginx-docker-image)
- [Redis](#Redis-docker-image)

## Ecosystem express

Demo of microservices ecosystem interconected interconnected with each other using DDD clean architecture and CQRS
The transaction between microservices was solved using Event Soursing with kafka ....

## pub_persons

This app is a cron-job typescript app service that will randomly generate fake customers and providers .
1- Generate ramdom persons
2- Performs calls to ComerceAPIExpress backend to get info from customers aand providers:

    customer post to /api/customer/
    provider post to /api/provider/

3- Every person and provider generaded will sended to ComerceAPIExpress for it creation (sql server )
api -> POST http://localhost:7000/api/persons/customers
api -> POST http://localhost:7000/api/persons/providers

## pub_product

This app is a cron-job typescript app service that will randomly generate & simulates products entering the shop werehause .-

This apps calls ComerceAPIExpress backend to creato or perfomr Inserts in the product storage (sql server )
api -> POST http://localhost:7000/api/products/

## pub_orders

This app is a cron-job typescript app service that will randomly generate orders that simulates the customers online shopping .-
To get porducts and customers for order creation this apps interacts with ComerceAPIExpress
api -> GET http://localhost:7000/api/products/

This apps calls OrdersAPIExpress backend to create or perform Inserts in the orders storage (mongo)

## ComerceAPIExpress

The comerce backend . It's an Express with typescript API that allows all CRUD operations for: customers providers and products

This api interact with sql server data and for each insert emit an event to the even-source.
For this purpose we implement kafka
api -> POST http://localhost:6001/api/orders/

## OrdersAPIExpress

The Orders backend . It's an Express with typescript Express API that allows all CRUD operations for: orders
This api interact with mongodb atlas server to store all orders and for each insert emit an event to the even-source. for this purpose
we implement kafka

#Implent kafka as event sousing

## Kafka docker images

Apache Kafka is a distributed streaming platform designed to build real-time pipelines and can be used as a message broker or as a replacement for a log aggregation solution for big data applications

We use Apache Kafka packaged by Bitnami

## Run the application using Docker Compose

### we use local docker-compose-kafka.yml content what should it contain this

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

Next run :

```
   docker-compose up -d
   docker-compose  -f docker-compose-kafka.yml up
   docker-compose  up docker-compose-kafka.yml -d

```

Below command will stop running containers, but it also removes the stopped containers as well as any networks that were created.
And.. for to remove vulumes append -v flag

```
    docker-compose down
    or
    docker-compose down -v
```

### kafka documentations

    https://www.npmjs.com/package/kafkajs
    https://www.youtube.com/watch?v=EiDLKECLcZw

### kafka packages

    yarn add kafkajs
    this trow this error ✕ missing peer openapi-types@>=7...so you have to install

        pnpm openapi-types@>=7

    yarn add @kafkajs/confluent-schema-registry

### kafka packages

    pnpm i kafkajs
    this trow this error ✕ missing peer openapi-types@>=7...so you have to install

        pnpm openapi-types@>=7

    yarn add i @kafkajs/confluent-schema-registry

## nginx docker image

Run this commando to start up load balancer and reverse proxy for ours APIs

```
docker-compose up -d -f docker-compose-nginx.yml
```

If you open obove yml file you notice that we have several configurated things.

1- Load balancer for image moviedomfo/express_comerce (#ComerceAPIExpress)
In docker compose we instantiate two containers for this api. One called ulises socrates and another ulises
We configure this with back section -->

```
    upstream back
        server platon:INT_PORT;
        server hercules:INT_PORT;
```

Calls http://localhost:6001/api/persons/ can be redirected to either platon or hercules based on the upstream configuration

2- Reverse proxy for the previous services.

    a-  location /platon/
        For calls http://localhost:6001/platon/api/persons/
    b-   location /hercules/
    For calls as http://localhost:6001/hercules/api/persons/

3 - Also, reverse porxy for moviedomfo/express_orders (#OrdersAPIExpress) dockers created in docker_file

a- location /ulises/
For calls http://localhost:6001/ulises/api/customers/
b- location /platon/
For calls as http://localhost:6001/platon/api/customers/

## Redis docker image

For the purpose of implementing tokens-cache among other things, our ecosystem uses Redis Cache.
To facilitate the container deployment, I have prepared a YAML file ready to run with Docker Hub.

Locate the directory where the "docker-compose-redis.yml" file is located. Root of all projects

```
    docker-compose -f docker-compose-redis.yml up -d
```
