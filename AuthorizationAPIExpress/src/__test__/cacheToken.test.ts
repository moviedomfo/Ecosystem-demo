import {describe, expect, test} from "@jest/globals";
// import {RedisKey} from "@domain/Entities/RedisKey";
import {v4 as uuidv4} from "uuid";
import {ICacheRepository} from "../application/interfases/ICacheRepository";
import {DateFunctions} from "../common/helpers";
import {RefreshToken} from "../domain/Entities/RefreshToken";
import InMemRedisCahceRepository from "../infra/repos/InMemRedisCahce.repo";

// const usert

describe("CacheRepository test", () => {
  let cacheRepository: ICacheRepository;

  beforeEach(() => {
    cacheRepository = new InMemRedisCahceRepository();
  });
  describe("GetTk", () => {
    it("should return a refresh token when given a valid key", async () => {
      const expireAt = DateFunctions.getExpirationDate(1);

      const _token = uuidv4();

      let refresh_token: RefreshToken = {
        Token: _token,
        Expires: expireAt,
        Created: DateFunctions.getCurrent(),
        UserID: "10000",
        CreatedByIp: "192.168.2.3"
      };
      const refreshToken_to_comapre = JSON.parse(JSON.stringify(refresh_token));

      // Insert a token into the cache
      cacheRepository.PushTk(refresh_token, _token);

      // Retrieve the token using the GetTk method
      const result = await cacheRepository.GetTk(_token);
      expect(result).toEqual(refreshToken_to_comapre);
    });

    it("should return null when given an invalid key", async () => {
      const refreshTokenKey = "refreshToken:xyz789";

      // Retrieve a non-existent token using the GetTk method
      const result = await cacheRepository.GetTk(refreshTokenKey);

      // Verify that the result is null
      expect(result).toBeUndefined();
    });
  });
});
