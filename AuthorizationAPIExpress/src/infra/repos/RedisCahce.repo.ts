import {ICacheRepository} from "@application/interfases/ICacheRepository";
import {AppConstants} from "@common/commonConstants";
import {RedisKey} from "@domain/Entities/RedisKey";
import {RefreshToken} from "@domain/Entities/RefreshToken";
const redis = require("redis");

/**Only responsibly  for store or cache the tokens. In redis*/
export default class RedisCacheRepository implements ICacheRepository {
  private static redisClient: any;

  public async GetTk(refresTokenKey: string): Promise<RefreshToken> {
    return new Promise(async (resolve) => {
      await RedisCacheRepository.CreateClient();

      const refresTokenJson = await RedisCacheRepository.redisClient.get(refresTokenKey);
      if (!refresTokenJson) resolve(undefined);
      const refresToken = JSON.parse(refresTokenJson) as RefreshToken;

      resolve(refresToken);
    });
  }
  public async GetAll(): Promise<RedisKey[]> {
    return new Promise(async (resolve) => {
      const list: RedisKey[] = [];
      await RedisCacheRepository.CreateClient();
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
  }

  public PushTk = async (tk: RefreshToken, refresTokenKey: string) => {
    try {
      // console.log(`message was cached into ${AppConstants.REDIS_HOST}, message id : ${req.id}`);
      await RedisCacheRepository.CreateClient();

      await RedisCacheRepository.redisClient.setEx(refresTokenKey, Number(AppConstants.REDIS_EXPIRES_TIME) * 60, JSON.stringify(tk));
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };

  public FlushAll = async () => {
    try {
      await RedisCacheRepository.CreateClient();
      await RedisCacheRepository.redisClient.flushall();
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };

  public Remove = async (refresTokenKey: string) => {
    try {
      await RedisCacheRepository.CreateClient();
      await RedisCacheRepository.redisClient.del(refresTokenKey);
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
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
      try {
        await RedisCacheRepository.redisClient.connect();
      } catch (err) {
        throw new Error("REDIS->" + err.message);
      }
    }
  }
}
