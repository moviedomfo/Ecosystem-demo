import {RsaKeys} from "../../domain/Entities/RSAHeys";
import HttpStatusCode from "../../common/Enums/HttpStatusCode";
import {GetUserRes} from "../../domain/DTOs/Auth/GetUserDto";
import {describe, expect} from "@jest/globals";
import supertest from "supertest";
import {app, server} from "../../index";

describe("Resources controller", () => {
  const rootPath = "/api/resourseclients";
  const api = supertest(app);
  let clientId = "pelsoftclient";

  it(`${rootPath}/generatePK should be ok`, async () => {
    const res = await api
      .get(`${rootPath}/generatePK?clientId=${clientId}`)
      .set("Accept", "application/json")
      .expect(HttpStatusCode.OK)
      .expect("Content-Type", /application\/json/);

    const result = res.body as RsaKeys;

    expect(result.publicKey).not.toBe("");
    expect(result.privateKey).toBe("");
  }, 60000);
  it(`${rootPath}/getPK should be ok`, async () => {
    const res = await api
      .get(`${rootPath}/getPK?clientId=${clientId}`)
      .set("Accept", "application/json")
      .expect(HttpStatusCode.OK)
      .expect("Content-Type", /application\/json/);

    const result = res.body as RsaKeys;
    expect(result.publicKey).not.toBe("");
    expect(result.privateKey).toBe("");
  }, 60000);
  // it(`${rootPath}/getPK should throw status NOT_FOUND 404 ok`, async () => {
  //   const res = await api
  //     .get(`${rootPath}/getPK?clientId=XXXXX_notExist`)
  //     .set("Accept", "application/json")
  //     .expect(HttpStatusCode.NOT_FOUND)
  //     .expect("Content-Type", /application\/json/);

  //   const result = res.body as GetUserRes;

  //   expect(result.User).toBeDefined();
  //   expect(result.User.userName).toEqual("davendra");
  // }, 60000);

  afterAll(() => {
    server.close();
  });
});
