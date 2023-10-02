import {describe, expect, test} from "@jest/globals";
import {v4 as uuidv4} from "uuid";
import {ICacheRepository} from "../../application/interfases/ICacheRepository";
import {RefreshToken} from "../../domain/Entities/RefreshToken";
import InMemCahceRepository from "../../infra/repos/InMemCahceRepository.repo";
import {CreateRefreshToken} from "../testUtils";

// const usert

describe("CacheRepository test", () => {
  let cacheRepository: ICacheRepository;
  let _token = "";
  let refresh_token: RefreshToken;
  beforeEach(() => {
    cacheRepository = new InMemCahceRepository();
  });
  describe("Complete crud", () => {
    it("1 should create refreshToken", async () => {
      _token = uuidv4();
      refresh_token = CreateRefreshToken(_token);
      const refreshToken_to_comapre = JSON.parse(JSON.stringify(refresh_token));

      // Insert a token into the cache
      cacheRepository.PushTk(refresh_token, _token);

      // Retrieve the token using the GetTk method
      const result = await cacheRepository.GetTk(_token);
      expect(result).toEqual(refreshToken_to_comapre);
    });

    it("2 should return a refresh token when given a valid key", async () => {
      const refreshToken_to_comapre = JSON.parse(JSON.stringify(refresh_token));

      // Insert a token into the cache
      cacheRepository.PushTk(refresh_token, _token);

      // Retrieve the token using the GetTk method
      const result = await cacheRepository.GetTk(_token);
      expect(result).toEqual(refreshToken_to_comapre);
    });

    it("3 should return null when given an invalid key", async () => {
      const refreshTokenKey = "refreshToken:xyz789";

      // Retrieve a non-existent token using the GetTk method
      const result = await cacheRepository.GetTk(refreshTokenKey);

      // Verify that the result is null
      expect(result).toBeUndefined();
    });
    it("4 should remove RefreshToken ", async () => {
      // try to retrive created refresh_token en mim

      await cacheRepository.Remove(refresh_token.Token);
      const result = await cacheRepository.GetTk(refresh_token.Token);

      // Verify that the result null
      expect(result).toEqual(undefined);
    });
  });
});
