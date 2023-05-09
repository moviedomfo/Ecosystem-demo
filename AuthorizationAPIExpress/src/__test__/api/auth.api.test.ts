import HttpStatusCode from "../../common/Enums/HttpStatusCode";
import {GetUserReq, GetUserRes} from "../../domain/DTOs/Auth/GetUserDto";
import {describe, expect} from "@jest/globals";
import supertest from "supertest";
import {AuthenticationReq, AuthenticationRes} from "../../domain/DTOs/Auth/AuthorizationDto";
import {app, server} from "../../index";

describe("Auth controller", () => {
  const rootPath = "/api/sec";
  const api = supertest(app);
  let jwt = "";
  let refresh_token = "";

  beforeEach(() => {
    jest.setTimeout(60000);
  });

  it(`${rootPath}/authenticate grant->password`, async () => {
    const req = new AuthenticationReq();
    req.username = "davendra";
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

  it(`${rootPath}/authenticate grant->password Should send error 401`, async () => {
    const req = new AuthenticationReq();
    req.username = "noexiste";
    req.password = "1111";
    req.grant_type = "password";
    req.client_id = "pelsoftclient";

    const res = await api
      .post(`${rootPath}/authenticate/`)
      .set("Accept", "application/json")
      .send(req)
      .expect(HttpStatusCode.UNAUTHORIZED)
      .expect("Content-Type", /application\/json/);
  });

  it(`${rootPath}/authenticate grant-> rerfesh`, async () => {
    const req = new AuthenticationReq();
    req.refresh_token = refresh_token;
    req.grant_type = "refresh_token";
    req.client_id = "pelsoftclient";

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
      // .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
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
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as GetUserRes;

    expect(result.User).toBeDefined();
    expect(result.User.userName).toEqual("davendra");
  }, 60000);
  afterAll(() => {
    server.close();
  });
});
