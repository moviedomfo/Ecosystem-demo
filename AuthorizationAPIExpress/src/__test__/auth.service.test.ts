import {JWTFunctions} from "./../common/helpers/jwtFunctions";
import {IUserRepository} from "./../application/interfases/IUserRepository";
import UserMockRepository from "./../infra/repos/UserMock.repo";
import {describe, expect, test} from "@jest/globals";
import {Token} from "../domain/Entities/Token";
import {v4 as uuidv4} from "uuid";

describe("RefreshTokenService", () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new UserMockRepository();
  });

  describe("JWT Tool", () => {
    it("Shounld create token (jwt) and validate its claims", () => {
      //1q2w3e4r
      /** this data comes from cached user data together with refresh_token   */
      const user = userRepository.FindByUserName("pedro65");

      //const user: User = await this.userRepository.FindByUserName(tokenData.UserID);

      // Use publick key to validate it
      const jwt = JWTFunctions.GenerateToken(user, "pelsoftclient");
      const token: Token = {
        id: uuidv4(),
        jwt,
        refreshToken: "",
        expire: new Date()
      };
      const decoded = JWTFunctions.Verify(token);
      let virification = false;
      if (typeof decoded.sub === "string" && typeof decoded["name"] === "string") {
        virification = true;
      }

      expect(virification).toBe(true);
    });
  });
});
