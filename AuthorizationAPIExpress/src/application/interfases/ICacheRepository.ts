import {RedisKey} from "@domain/Entities/RedisKey";
import {RefreshToken} from "@domain/Entities/RefreshToken";
import {Token} from "@domain/Entities/token";

export interface ICacheRepository {
  GetTk: (refresTokenKey: string) => Promise<RefreshToken>;
  FushTk: () => void;
  PushTk: (tk: RefreshToken, refresTokenKey: string) => void;
  Remove(refresTokenKey: string): void;
  //GetAll: () => RedisKey[];
  GetAll(): Promise<RedisKey[]> ;
}
