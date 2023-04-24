import RefreshTokenService from "../application/RefreshToken.service";
import {describe, expect, test} from "@jest/globals";
import {v4 as uuidv4} from "uuid";
// import {RefreshToken} from "@domain/Entities/RefreshToken";
import {ICacheRepository} from "../application/interfases/ICacheRepository";
import InMemRedisCahceRepository from "../infra/repos/InMemRedisCahce.repo";
import {RefreshToken} from "../domain/Entities/RefreshToken";
import {DateFunctions} from "../common/helpers";
import {json} from "stream/consumers";

describe("RefreshTokenService", () => {
  let cacheRepository: ICacheRepository;
  let refreshTokenService: RefreshTokenService;
  let refresh_token: RefreshToken;

  beforeEach(() => {
    cacheRepository = new InMemRedisCahceRepository();
    refreshTokenService = new RefreshTokenService(cacheRepository);
  });

  describe("CreateRefreshToken", () => {
    it("should create refreshToken ", async () => {
      const expireAt = DateFunctions.getExpirationDate(1);

      const _token = uuidv4();

      refresh_token = {
        Token: _token,
        Expires: expireAt,
        Created: DateFunctions.getCurrent(),
        UserID: "10000",
        CreatedByIp: "192.168.2.3"
      };
      const refresh_token_to_compare = JSON.parse(JSON.stringify(refresh_token));
      await cacheRepository.PushTk(refresh_token, refresh_token.Token);
      const recoveredTk = await cacheRepository.GetTk(_token);

      expect(refresh_token_to_compare).toEqual(recoveredTk);
    });
  });

  describe("RefreshToken", () => {
    it("should return a RefreshToken type RefreshToken", async () => {
      // try to retrive created refresh_token en mim

      const result = await refreshTokenService.RefreshToken(refresh_token.Token);
      // Verify that the result matches the original token
      expect(result).toBeDefined();
    });

    it("should be undefined when given an invalid key", async () => {
      const refreshTokenKey = "refreshToken:xyz789";
      // Retrieve a non-existent token using the GetTk method
      const result = await cacheRepository.GetTk(refreshTokenKey);
      // Verify that the result is null
      expect(result).toBeUndefined();
    });
  });

  describe("Remove", () => {
    it("should remove RefreshToken ", async () => {
      // try to retrive created refresh_token en mim

      await refreshTokenService.Remove(refresh_token.Token);
      const result = await cacheRepository.GetTk(refresh_token.Token);

      // Verify that the result null
      expect(result).toEqual(undefined);
    });
  });
});
