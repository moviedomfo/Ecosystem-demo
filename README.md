# Table of Contents

- [Intro](#ecosystem_express)
- [Customers & Provider registering](#pub_persons)
- [Orders -customers online shopping](#pub_orders)
- [Products - inventory ](#pub_product)
- [Customers & Provider API](#PersonsAPIExpress)
- [Orers API](#OrdersAPIExpress)
- [Kafka & docker](#Kafka-docker-images)

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

The comerce backend . It's an  Express with typescript API that allows all CRUD operations for: customers providers and products

This api interact with sql server data and for each insert emit an event to the even-source. 
For this purpose we implement kafka
    api  -> POST http://localhost:6000/api/orders/

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

Next run:

```
     docker-compose up -d
```

or

     1) docker-compose  -f docker-compose-kafka.yml down
     2) docker-compose up -d

### kafka documentations

    https://www.npmjs.com/package/kafkajs
    https://www.youtube.com/watch?v=EiDLKECLcZw

### kafka packages

    pnpm i kafkajs
    this trow this error ✕ missing peer openapi-types@>=7...so you have to install

        pnpm openapi-types@>=7

    pnpm i @kafkajs/confluent-schema-registry

 
 docker-compose  up docker-compose-kafka.yml -d