import {Token} from "./../domain/Entities/Token";
import {createContainer} from "awilix";
import RefreshTokenService from "../application/RefreshToken.service";
import {describe, expect, test} from "@jest/globals";
import {v4 as uuidv4} from "uuid";
import {ICacheRepository} from "../application/interfases/ICacheRepository";
import InMemRedisCahceRepository from "../infra/repos/InMemRedisCahce.repo";
import {RefreshToken} from "../domain/Entities/RefreshToken";
import {DateFunctions} from "../common/helpers";
import {json} from "stream/consumers";
import {CreateRefreshToken} from "./testUtils";

describe("RefreshTokenService", () => {
  let cacheRepository: ICacheRepository;
  let refreshTokenService: RefreshTokenService;
  let refresh_token: RefreshToken;
  let _token = "";

  beforeEach(() => {
    cacheRepository = new InMemRedisCahceRepository();
    refreshTokenService = new RefreshTokenService(cacheRepository);
  });

  describe("CreateRefreshToken", () => {
    it("Should create NEW refreshToken ", async () => {
      refresh_token = CreateRefreshToken(_token);
      const newTk: RefreshToken = await refreshTokenService.CreateRefreshToken(refresh_token.UserID, refresh_token.CreatedByIp);
      _token = newTk.Token;
      expect(newTk).toBeDefined();

      //expect(refresh_token).toEqual(recoveredTk);
    });
  });

  describe("RefreshToken", () => {
    it("Whit valid token should return a new RefreshToken ", async () => {
      //_token = uuidv4();
      //refresh_token = CreateRefreshToken(_token);

      const newTk = await refreshTokenService.RefreshToken(_token);
      // Verify that the result matches the original token
      //const areNotThesame = _token !== result.Token;
      const areNotThesame = _token !== newTk.Token && newTk.Created !== refresh_token.Created;
      //expect(result).toBeDefined();
      expect(areNotThesame).toEqual(true);
    });

    it("should be undefined when given an invalid key", async () => {
      const refreshTokenKey = uuidv4();
      // Retrieve a non-existent token using the GetTk method
      const result = await cacheRepository.GetTk(refreshTokenKey);
      // Verify that the result is null
      expect(result).toBeUndefined();
    });
  });

  describe("Remove", () => {
    it("should remove RefreshToken ", async () => {
      // try to retrive created refresh_token en mim

      await refreshTokenService.Remove(_token);
      const result = await cacheRepository.GetTk(_token);

      // Verify that the result null
      expect(result).toEqual(undefined);
    });
  });
});
