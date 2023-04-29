import {JwtPayload, TokenExpiredError} from "jsonwebtoken";
import {JWTFunctions} from "../common/helpers/jwtFunctions";
import {IUserRepository} from "../application/interfases/IUserRepository";
import UserMockRepository from "../infra/repos/UserMock.repo";
import {describe, expect, test} from "@jest/globals";
import {Token} from "../domain/Entities/Token";
import {v4 as uuidv4} from "uuid";
import config from "config";

import container from "./jest.setup";

describe("JWT Util test", () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = container.resolve("userRepository") as UserMockRepository;
  });

  describe("JWT Tool", () => {
    it("Shounld create token (jwt) and validate its claims", async () => {
      //1q2w3e4r
      /** this data comes from cached user data together with refresh_token   */
      const user = await userRepository.FindByUserName("pedro65");

      //const user: User = await this.userRepository.FindByUserName(tokenData.UserID);
      // Use publick key to validate it
      const jwt = JWTFunctions.GenerateToken(user, "pelsoftclient");
      const token: Token = {
        id: uuidv4(),
        jwt,
        refreshToken: "",
        expire: new Date()
      };

      //let verification = true;
      const decode: JwtPayload = JWTFunctions.Verify(token) as JwtPayload;
      const name = decode["name"];
      const iat = decode.iat || 0;
      const exp = decode.exp || 0;

      const verificationOK = exp >= iat && name === "pedro65";

      expect(verificationOK).toBe(true);
    });

    it("Old token (jwt) throw error ", async () => {
      const jwt = config.get<string>("server.oldJwtTest");
      const token: Token = {
        id: uuidv4(),
        jwt,
        refreshToken: "",
        expire: new Date()
      };

      //let verification = true;
      try {
        JWTFunctions.Verify(token);
      } catch (err) {
        expect(err).toBeInstanceOf(TokenExpiredError);
        // if (err instanceof TokenExpiredError) {
        //   expect(true).toBe(true);
        // }
      }
      //expect(JWTFunctions.Verify(token)).toThrow();
    });
  });
});
