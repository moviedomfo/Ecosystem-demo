import { ICacheRepository } from "@application/interfases/ICacheRepository";
import { RedisKey } from "@domain/Entities/RedisKey";
import { RefreshToken } from "@domain/Entities/RefreshToken";

/**Only responsibly  for store or cache the tokens. In redis*/
export default class InMemCahceRepository implements ICacheRepository {

  static storage: { [key: string]: string };

  public async GetTk(refresTokenKey: string): Promise<RefreshToken> {
    InMemCahceRepository.CreateStore();
    return new Promise(async (resolve) => {
      InMemCahceRepository.CreateStore();

      const refresTokenJson = await InMemCahceRepository.storage[refresTokenKey];
      if (refresTokenJson === undefined) {
        resolve(undefined);
      } else {
        const refresToken = JSON.parse(refresTokenJson) as RefreshToken;

        resolve(refresToken);
      }
    });
  }

  public async GetAll(): Promise<RedisKey[]> {
    InMemCahceRepository.CreateStore();
    return new Promise(async (resolve) => {
      const list: RedisKey[] = [];
      // Recorrer el diccionario y agregar cada elemento al array
      for (const key in InMemCahceRepository.storage) {
        if (InMemCahceRepository.storage.hasOwnProperty(key)) {
          const value = InMemCahceRepository.storage[key];
          list.push(new RedisKey(key, value));
        }
      }

      resolve(list);
    });
  }

  public PushTk = async (tk: RefreshToken, refresTokenKey: string) => {
    try {
      // console.log(`message was cached into ${AppConstants.REDIS_HOST}, message id : ${req.id}`);
      InMemCahceRepository.CreateStore();

      InMemCahceRepository.storage[refresTokenKey] = JSON.stringify(tk);
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };

  public FlushAll = async () => {
    try {
      // this.CreateClient();
      InMemCahceRepository.storage = {};
    } catch (err) {
      throw new Error("REDIS->" + err.message);
    }
  };

  public Remove = async (refresTokenKey: string) => {
    InMemCahceRepository.CreateStore();
    delete InMemCahceRepository.storage[refresTokenKey];
  };

  static CreateStore() {
    if (InMemCahceRepository.storage === undefined) {
      InMemCahceRepository.storage = {};
    }
  }

  GetByUserId(userId: string): Promise<RedisKey[]> {
    throw new Error("Method not implemented.");
  }

}
