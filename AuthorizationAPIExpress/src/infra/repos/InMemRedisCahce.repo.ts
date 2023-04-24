import {ICacheRepository} from "@application/interfases/ICacheRepository";
import {AppConstants} from "@common/commonConstants";
import {RedisKey} from "@domain/Entities/RedisKey";
import {RefreshToken} from "@domain/Entities/RefreshToken";

/**Only responsibly  for store or cache the tokens. In redis*/
export default class InMemRedisCahceRepository implements ICacheRepository {
  static storage: {[key: string]: string};

  public async GetTk(refresTokenKey: string): Promise<RefreshToken> {
    InMemRedisCahceRepository.CreateStore();
    return new Promise(async (resolve) => {
      InMemRedisCahceRepository.CreateStore();

      const refresTokenJson = await InMemRedisCahceRepository.storage[refresTokenKey];
      if (refresTokenJson === undefined) {
        resolve(undefined);
      } else {
        const refresToken = JSON.parse(refresTokenJson) as RefreshToken;

        resolve(refresToken);
      }
    });
  }

  public async GetAll(): Promise<RedisKey[]> {
    InMemRedisCahceRepository.CreateStore();
    return new Promise(async (resolve) => {
      const list: RedisKey[] = [];
      // Recorrer el diccionario y agregar cada elemento al array
      for (const key in InMemRedisCahceRepository.storage) {
        if (InMemRedisCahceRepository.storage.hasOwnProperty(key)) {
          const value = InMemRedisCahceRepository.storage[key];
          list.push(new RedisKey(key, value));
        }
      }

      resolve(list);
    });
  }

  public PushTk = async (tk: RefreshToken, refresTokenKey: string) => {
    try {
      // console.log(`message was cached into ${AppConstants.REDIS_HOST}, message id : ${req.id}`);
      InMemRedisCahceRepository.CreateStore();

      InMemRedisCahceRepository.storage[refresTokenKey] = JSON.stringify(tk);
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };

  public FlushAll = async () => {
    try {
      // this.CreateClient();
      InMemRedisCahceRepository.storage = {};
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };

  public Remove = async (refresTokenKey: string) => {
    InMemRedisCahceRepository.CreateStore();
    delete InMemRedisCahceRepository.storage[refresTokenKey];
  };

  static CreateStore() {
    if (InMemRedisCahceRepository.storage === undefined) {
      InMemRedisCahceRepository.storage = {};
    }
  }
}
