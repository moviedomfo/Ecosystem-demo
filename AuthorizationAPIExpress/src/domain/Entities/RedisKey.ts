export class RedisKey {
  constructor(key: string, value: string) {
    this.Key = key;
    this.Value = value;
  }

  public Key: string;
  public Value: string;
}
