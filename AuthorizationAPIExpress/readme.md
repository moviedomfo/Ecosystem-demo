# Auth service

## run redis container with compose

[likn](https://kb.objectrocket.com/redis/run-redis-with-docker-compose-1055)

run

```
     docker-compose up docker-compose-redis.yml --build
```

## Enviroment values

- JWT_SECRET : secret key used to create jwt
- JWT_Expires=jwt expiration time in minutes
- JWT_ExpiresRefreshToken=jwt expiration time in minutes e.. 1440 1 day
  Generally refresh tk are expressed in long times, but the lenght of times is relative.
  So, a "minute" is used as minimal unit

- REDIS_EXPIRES_TIME : Expiry time of redis cache items in minutes
- RUTA_REDIS='e:/volumens/redis' in localhost represent where the redis
  cache is perists.-
