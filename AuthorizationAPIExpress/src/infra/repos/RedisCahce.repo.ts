import {ICacheRepository} from "@application/interfases/ICacheRepository";
import {AppConstants} from "@common/commonConstants";
import {RedisKey} from "@domain/Entities/RedisKey";
import {RefreshToken} from "@domain/Entities/RefreshToken";
import {Token} from "@domain/Entities/token";
const redis = require("redis");

/**Only responsibly  for store or cache the tokens. In redis*/
export default class RedisCacheRepository implements ICacheRepository {
  private static redisClient: any;

  public async GetTk(refresTokenKey: string): Promise<RefreshToken> {
    return new Promise(async (resolve) => {
      RedisCacheRepository.CreateClient();

      const refresTokenJson = await RedisCacheRepository.redisClient.get(refresTokenKey);
      if (!refresTokenJson) resolve(undefined);
      const refresToken = JSON.parse(refresTokenJson) as RefreshToken;

      resolve(refresToken);
    });
  }
  public async GetAll(): Promise<RedisKey[]> {
    return new Promise(async (resolve) => {
      const list: RedisKey[] = [];
      RedisCacheRepository.CreateClient();
      const redisClient = RedisCacheRepository.redisClient;
      const keys = await new Promise<string[]>((resolve, reject) => {
        redisClient.keys("*", (err, keys) => {
          if (err) reject(err);
          resolve(keys);
        });
      });
      // Iterar sobre todas las claves y obtener su valor
      for (const key of keys) {
        const value = await new Promise<string | null>((resolve, reject) => {
          redisClient.get(key, (err, value) => {
            if (err) reject(err);
            resolve(value);
          });
        });
        console.log(`${key}: ${value}`);
        list.push(new RedisKey(key, value));
      }

      resolve(list);
    });

    // return new Promise(async (resolve) => {

    //   RedisCacheRepository.CreateClient();
    //   const list: RedisKey[] = [];

    //   //recorro las claves y luego los contenidos de las claves
    //   await RedisCacheRepository.redisClient.keys("*", (err, keys) => {
    //     if (err) reject(err);

    //     keys.forEach(async (key) => {
    //       await RedisCacheRepository.redisClient.get(key, (err, value) => {
    //         if (err) reject(err);
    //         list.push(new RedisKey(key, value));
    //         //console.log(`${key}: ${value}`);
    //       });
    //     });
    //   });

    //   resolve(list);
    // });
  }

  public PushTk = async (tk: RefreshToken, refresTokenKey: string) => {
    try {
      // console.log(`message was cached into ${AppConstants.REDIS_HOST}, message id : ${req.id}`);
      RedisCacheRepository.CreateClient();

      await RedisCacheRepository.redisClient.setEx(refresTokenKey, Number(AppConstants.REDIS_EXPIRES_TIME) * 60, JSON.stringify(tk));
    } catch (err) {
      throw err;
    }
  };

  public FushTk = async () => {
    try {
      RedisCacheRepository.CreateClient();
      await RedisCacheRepository.redisClient.flushall();
    } catch (err) {
      throw err;
    }
  };

  public Remove = async (refresTokenKey: string) => {
    RedisCacheRepository.CreateClient();
    await RedisCacheRepository.redisClient.del(refresTokenKey);
  };

  static async CreateClient() {
    if (!RedisCacheRepository.redisClient) {
      RedisCacheRepository.redisClient = redis.createClient({
        socket: {
          host: "localhost",
          port: 6379
        },
        password: "pletorico28"
        // username: "pletorico28",
      });
      await RedisCacheRepository.redisClient.connect();
    }
  }
}
