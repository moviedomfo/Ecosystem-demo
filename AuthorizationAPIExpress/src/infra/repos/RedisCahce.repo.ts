import {ICacheRepository} from "@application/interfases/ICacheRepository";
import {AppConstants} from "@common/commonConstants";
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

  public PushTk = async (tk: RefreshToken, refresTokenKey: string) => {
    try {
      // console.log(`message was cached into ${AppConstants.REDIS_HOST}, message id : ${req.id}`);
      RedisCacheRepository.CreateClient();

      await RedisCacheRepository.redisClient.setEx(refresTokenKey, Number(process.env.REDIS_EXPIRE_TIME), JSON.stringify(tk));
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
