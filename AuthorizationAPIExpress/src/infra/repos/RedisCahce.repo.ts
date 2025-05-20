import { ICacheRepository } from "@application/interfases/ICacheRepository";
import { AppConstants } from "@common/commonConstants";
import { RedisKey } from "@domain/Entities/RedisKey";
import { RefreshToken } from "@domain/Entities/RefreshToken";
const redis = require("redis");

/**Only responsibly  for store or cache the tokens. In redis*/
export default class RedisCacheRepository implements ICacheRepository {
  private static redisClient: any;

  public async GetTk(refresTokenKey: string): Promise<RefreshToken> {
    try {
      await RedisCacheRepository.CreateClient();

      const refresTokenJson = await RedisCacheRepository.redisClient.get(refresTokenKey);
      if (!refresTokenJson) {
        return undefined;
      }


      const refresToken = JSON.parse(refresTokenJson) as RefreshToken;

      return refresToken;
    } catch (err) {
      const error = new Error("REDIS->" + err.message);
      throw error;
    }

  };

  /**
   * 
   * @param userId getAllUserTokens
   * @returns 
   */
  public async GetByUserId(userId: string): Promise<RedisKey[]> {
    try {
      await RedisCacheRepository.CreateClient();

      const setKey = `refresh:user:${userId}`;
      const keys = await RedisCacheRepository.redisClient.sMembers(setKey);

      const rawTokens = await Promise.all(
        keys.map((key) => RedisCacheRepository.redisClient.get(key))
      );
      // Filtrar tokens que estén null (expirados) y parsear a objetos
      const tokens = rawTokens
        .filter((t): t is string => t !== null)
        .map((t) => JSON.parse(t) as RedisKey);

      return tokens;

    } catch (err) {
      const error = new Error("REDIS->" + err.message);
      throw error;
    }

  };

  /**
   * 
   * @param filter refresh:user:*
   * @returns 
   */
  public async GetAll(filter: string): Promise<RedisKey[]> {
    await RedisCacheRepository.CreateClient();
    const redisClient = RedisCacheRepository.redisClient;
    const keys = await redisClient.keys(filter); // ⚠️ cuidado si hay muchas claves

    const entries: RedisKey[] = [];

    for (const key of keys) {
      const type = await redisClient.type(key);

      if (type === 'string') {
        const value = await redisClient.get(key);
        if (value !== null) {
          entries.push(new RedisKey(key, value));
        }
      }
    }


    return entries;
  }

  /**
   * 
   * @param tk 
   * @param keyIndexPrefix refresh:user
   */
  public PushTk = async (tk: RefreshToken, keyIndexPrefix: string) => {
    try {
      // console.log(`message was cached into ${AppConstants.REDIS_HOST}, message id : ${req.id}`);
      await RedisCacheRepository.CreateClient();

      const tokenKey = `${keyIndexPrefix}:${tk.UserID}:${tk.Token}`;
      const userSetKey = `${keyIndexPrefix}:${tk.UserID}`; // 👈 clave del SET que agrupa los tokens de ese user

      const time = Number(AppConstants.REDIS_EXPIRES_TIME) * 60;

      await RedisCacheRepository.redisClient.setEx(tokenKey, time, JSON.stringify(tk));

      // Agregás el token a un Set para ese usuario
      await RedisCacheRepository.redisClient.sAdd(userSetKey, tokenKey);
      // console.log(JSON.stringify(tk))
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
  public RemoveAllUserTokensByUserId = async (userId: string) => {
    try {
      await RedisCacheRepository.CreateClient();
      const keys = await RedisCacheRepository.redisClient.keys(`refresh:user:${userId}:*`);
      if (keys.length) await RedisCacheRepository.redisClient.del(...keys);
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };
  public RemoveAllUserTokens = async () => {
    try {
      await RedisCacheRepository.CreateClient();
      const keys = await RedisCacheRepository.redisClient.keys(`refresh:user:*`);
      if (keys.length) await RedisCacheRepository.redisClient.del(...keys);
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };
  static async CreateClient() {
    if (!RedisCacheRepository.redisClient) {
      const c = {
        socket: {
          host: AppConstants.REDIS_HOST,
          port: AppConstants.REDIS_PORT
        },
        password: AppConstants.REDIS_PASSWORD
      }
      RedisCacheRepository.redisClient = redis.createClient(c);
      try {
        await RedisCacheRepository.redisClient.connect();
      } catch (err) {
        if (err.code === "ECONNREFUSED") {
          RedisCacheRepository.redisClient.quit();
          RedisCacheRepository.redisClient = undefined;
        }

        throw new Error("REDIS->" + err.message);
      }
    }
  }
}
