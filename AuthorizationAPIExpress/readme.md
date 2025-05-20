# Auth service Autenticación con JWT en Express

`Description:`

In this porject, we have implemented JSON Web Token (JWT) authentication using mok database user stored in an json file.-

When a user sussefully logued in, a JWT and Refresh token are generated. JWT contaqins information abaut user session.
The minimal info is recomended.-

This token is returned to the client and is used to identify and authenticate the user on future requests.
In addition, we have also implemented the generation of Refresh Tokens, which allow the user to renew their access token without having to log in again.

## Working with the project

`To run the project, follow the steps below:`

- Clone the repository to your local machine.
- Go to the folder
- Install the dependencies with the **yarn install** command
- Create an .env file in the root of the project and define the following environment variables:

### Enviroment values

- JWT_SECRET : Secret key used to create jwt
- JWT_Expires : jwt expiration time in minutes
- JWT_ExpiresRefreshToken : jwt expiration time in minutes e.. 1440 1 day
  Generally refresh tk are expressed in long times, but the lenght of times is relative.
  So, a "minute" is used as minimal unit

- REDIS_EXPIRES_TIME : Expiry time of redis cache items in minutes
- REDIS_PATH : 'e:/volumens/redis' in localhost represent where the redis
  cache is perists.-

## sample NODE_ENV="development"

```
PORT=3010
BASE_URL = 'http://localhost'
CLIENT_NAME='Authorization API Express'
REDIS_HOST='localhost:9092'
JWT_Expires=5
JWT_ExpiresRefreshToken=600
JWT_AUDIENCE='https://pelsoft.com'
JWT_ISSUER='notused'
NODE_ENV="production" // development or production
```

## Unit test

yarn test : use this script for simple unit testing
yarn test --detectOpenHandles --watchAll we'll see -> collect and print open
handles preventing detected

"test": "jest --coverage --watchAll"

## Dockerize

You can use docker to deploy the api server. In this releasse we leave a dockerfile and a docker compose ready to use

### generate image

```
    docker image build -t moviedomfo/express_auth .

```

### run a single container whitout reverse proxy

```
    docker run -d -p 3010:3010 --name express_auth moviedomfo/express_auth
```

- Navigate to this url to check the if correctly docker container is running
  <http://localhost:3009>

## run redis container with docker compose

- Redis docker ref [likn](https://kb.objectrocket.com/redis/run-redis-with-docker-compose-1055)

Locate the directory where the "docker-compose-redis.yml" file is located. Root of all projects

```
    docker-compose -f docker-compose-redis.yml up -d
```
