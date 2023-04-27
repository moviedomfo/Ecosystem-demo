import {JwtPayload, TokenExpiredError} from "jsonwebtoken";
import {JWTFunctions} from "./../common/helpers/jwtFunctions";
import {IUserRepository} from "./../application/interfases/IUserRepository";
import UserMockRepository from "./../infra/repos/UserMock.repo";
import {describe, expect, test} from "@jest/globals";
import {Token} from "../domain/Entities/Token";
import {v4 as uuidv4} from "uuid";
import config from "config";
import supertest from "supertest";
import container from "../__test__/jest.setup";
import {AuthenticationReq, AuthenticationRes} from "../domain/DTOs/Auth/AuthorizationDto";
import {app, server} from "../index";

describe("Auth controller", () => {
  //const app = CreateServer();
  const api = supertest(app);
  const PORT = process.env.PORT || 5000;
  //const URL = `${process.env.BASE_URL}:${PORT}`;

  // describe(`${process.env.BASE_URL}:${PORT}/api/sec/authenticate/`, () => {
  //   const req = new AuthenticationReq();
  //   req.username = "maria123";
  //   req.password = "1234";
  //   req.grant_type = "password";
  //   req.client_id = "pelsoftclient";

  //   it("Should authorize return 200 OK"),
  //     async () => {
  //       await api
  //         .post("/api/sec/authenticate/")
  //         .send(JSON.stringify(req))
  //         .set("Accept", "application/json")
  //         .expect(200)
  //         .expect("Content-Type", /application\/json/)
  //         .then((response) => {
  //           expect(response.body).toBeDefined();
  //         });

  //       // .expect("Content-Type", "application/json")
  //       // .end(function (err, res) {
  //       //   if (err) throw err;
  //       // });
  //     };
  // });
  it(`/api/sec/authenticate/ 200`, async () => {
    const req = new AuthenticationReq();
    req.username = "maria123";
    req.password = "1234";
    req.grant_type = "password";
    req.client_id = "pelsoftclient";

    const res = await api
      .post("/api/sec/authenticate/")
      .set("Accept", "application/json")
      .send(req)
      // .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as AuthenticationRes;
    expect(result.refresh_token).toBeDefined();
    expect(result.token).toBeDefined();
  });
  afterAll(() => {
    server.close();
  });
});
describe("JWT Util test", () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    //userRepository = new UserMockRepository();
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
