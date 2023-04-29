import {IUserRepository} from "../../application/interfases/IUserRepository";
import UserMockRepository from "../../infra/repos/UserMock.repo";
import {describe, expect} from "@jest/globals";
import supertest from "supertest";
import container from "../jest.setup";
import {AuthenticationReq, AuthenticationRes} from "../../domain/DTOs/Auth/AuthorizationDto";
import {app, server} from "../../index";
import {ICacheRepository} from "../../application/interfases/ICacheRepository";

describe("Auth controller", () => {
  const rootPath = "/api/sec";
  const api = supertest(app);
  let jwt = "";
  let refresh_token = "";
  // let userRepository: IUserRepository;
  // let cacheRepository: ICacheRepository;
  beforeEach(() => {
    // userRepository = container.resolve("userRepository") as UserMockRepository;
    // cacheRepository = container.resolve("cacheRepository") as ICacheRepository;
    jest.setTimeout(60000);
  });

  it(`${rootPath}/authenticate/ grant->password`, async () => {
    const req = new AuthenticationReq();
    req.username = "maria123";
    req.password = "1234";
    req.grant_type = "password";
    req.client_id = "pelsoftclient";

    const res = await api
      .post(`${rootPath}/authenticate/`)
      .set("Accept", "application/json")
      .send(req)
      // .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as AuthenticationRes;
    jwt = result.token;
    refresh_token = result.refresh_token;
    expect(result.refresh_token).toBeDefined();
    expect(result.token).toBeDefined();
  });

  it(`${rootPath}/authenticate/ grant-> rerfesh`, async () => {
    const req = new AuthenticationReq();
    req.refresh_token = refresh_token;
    req.grant_type = "refresh_token";
    req.client_id = "pelsoftclient";

    const res = await api
      .post(`${rootPath}/authenticate/`)
      .set("Accept", "application/json")
      .send(req)
      // .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as AuthenticationRes;
    jwt = result.token;
    refresh_token = result.refresh_token;
    expect(result.refresh_token).toBeDefined();
    expect(result.token).toBeDefined();
  });
  afterAll(() => {
    server.close();
  });
});
