import {RedisKey} from "@domain/Entities/RedisKey";
import {RefreshToken} from "@domain/Entities/RefreshToken";

export interface ICacheRepository {
  GetTk: (refresTokenKey: string) => Promise<RefreshToken>;
  FlushAll: () => void;
  PushTk: (tk: RefreshToken, refresTokenKey: string) => void;
  Remove(refresTokenKey: string): void;
  GetAll(): Promise<RedisKey[]>;
}
