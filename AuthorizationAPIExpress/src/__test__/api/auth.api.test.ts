import HttpStatusCode from "../../common/Enums/HttpStatusCode";
import {GetUserReq, GetUserRes} from "../../domain/DTOs/Auth/GetUserDto";
import {describe, expect} from "@jest/globals";
import supertest from "supertest";
import {AuthenticationReq, AuthenticationRes} from "../../domain/DTOs/Auth/AuthorizationDto";
import {app, server} from "../../index";
//import {GetRefreshTkReq} from "../../domain/DTOs/Token/GetRefreshTkDto";
//import {RefreshToken} from "../../domain/Entities/RefreshToken";
import RefreshTokenService from "../../application/RefreshToken.service";
import {ICacheRepository} from "../../application/interfases/ICacheRepository";
import InMemCahceRepository from "../../infra/repos/InMemCahceRepository.repo";

describe("Auth controller", () => {
  let cacheRepository: ICacheRepository;
  let refreshTokenService: RefreshTokenService;
  const rootPath = "/api/sec";
  const api = supertest(app);
  let jwt = "";
  let refresh_token = "";
  const client_id = "pelsoftclient";
  beforeEach(() => {
    //jest.setTimeout(60000);
    cacheRepository = new InMemCahceRepository();
    refreshTokenService = new RefreshTokenService(cacheRepository);
  });

  it(`${rootPath}/authenticate grant->password`, async () => {
    const req = new AuthenticationReq();
    req.username = "davendra";
    req.password = "1234";
    req.grant_type = "password";
    req.client_id = client_id;

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
  }, 60000);

  it(`${rootPath}/authenticate grant-> rerfesh`, async () => {
    const req = new AuthenticationReq();

    await setRefreshToken();

    req.refresh_token = refresh_token;
    req.grant_type = "refresh_token";
    req.client_id = client_id;

    const res = await api
      .post(`${rootPath}/authenticate/`)
      .set("Accept", "application/json")
      .send(req)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as AuthenticationRes;
    jwt = result.token;
    refresh_token = result.refresh_token;
    expect(result.refresh_token).toBeDefined();
    expect(result.token).toBeDefined();
  }, 60000);

  it(`${rootPath}/getUser`, async () => {
    const req = new GetUserReq();
    req.username = "davendra";

    const res = await api
      .get(`${rootPath}/getUser/`)
      .set("Accept", "application/json")
      .send(req)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as GetUserRes;

    expect(result.User).toBeDefined();
    expect(result.User.userName).toEqual("davendra");
  }, 60000);

  it(`${rootPath}/getUsersec `, async () => {
    const req = new GetUserReq();
    req.username = "davendra";

    const res = await api
      .get(`${rootPath}/getUser/`)
      .set("Accept", "application/json")
      .send(req)
      .set("Authorization", `bearer ${jwt}`)
      .set("clientId", `${client_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as GetUserRes;

    expect(result.User).toBeDefined();
    expect(result.User.userName).toEqual("davendra");
  }, 60000);

  it(`${rootPath}/authenticate grant->password Should send error 401`, async () => {
    const req = new AuthenticationReq();
    req.username = "noexiste";
    req.password = "1111";
    req.grant_type = "password";
    req.client_id = client_id;

    const res = await api
      .post(`${rootPath}/authenticate/`)
      .set("Accept", "application/json")
      .send(req)
      .expect(HttpStatusCode.UNAUTHORIZED)
      .expect("Content-Type", /application\/json/);
  });

  const setRefreshToken = async () => {
    const rt = await refreshTokenService.CreateRefreshToken("1da4a6a3-6cd4-4a2c-a4ea-f6dc2f6b9a88", "pelsoftclient");
    refresh_token = rt.Token;
  };

  afterAll(() => {
    server.close();
  });
});
