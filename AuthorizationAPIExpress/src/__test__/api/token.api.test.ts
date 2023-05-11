import {describe, expect} from "@jest/globals";
import supertest from "supertest";
import {AuthenticationReq, AuthenticationRes} from "../../domain/DTOs/Auth/AuthorizationDto";
import {GetRefreshTkReq} from "../../domain/DTOs/Token/GetRefreshTkDto";
import {RefreshToken} from "../../domain/Entities/RefreshToken";
import {app, server} from "../../index";

describe("Test token controller", () => {
  const rootPath = "/api/tk";
  const api = supertest(app);
  let jwt = "";
  let refresh_token = "";

  beforeEach(async () => {
    await createTk();
    jest.setTimeout(60000);
  });

  it(`${rootPath}/GetRefreshToken grant->password`, async () => {
    const req = new GetRefreshTkReq();
    req.refresh_token = refresh_token;
    const res = await api
      .get(`${rootPath}/GetRefreshToken/`)
      .set("Accept", "application/json")
      .send(req)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as RefreshToken;
    expect(result.Token).toBeDefined();
  });

  // it(`${rootPath}/DelRefreshToken grant-> rerfesh`, async () => {
  //   const res = await api
  //     .delete(`${rootPath}/DelRefreshToken/`)
  //     .set("Accept", "application/json")
  //     .query({tk: refresh_token})
  //     // .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
  //     .expect(200)
  //     .expect("Content-Type", /application\/json/);
  // });

  afterAll(() => {
    server.close();
  });

  const createTk = async () => {
    const req = new AuthenticationReq();
    req.username = "davendra";
    req.password = "1234";
    req.grant_type = "password";
    req.client_id = "pelsoftclient";

    const res = await api
      .post(`/api/sec/authenticate/`)
      .set("Accept", "application/json")
      .send(req)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = res.body as AuthenticationRes;
    jwt = result.token;
    refresh_token = result.refresh_token;
  };
});
