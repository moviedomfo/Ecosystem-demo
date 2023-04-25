import {verify, sign, JwtPayload} from "jsonwebtoken";
import {Token} from "@domain/Entities/token";
import {User} from "@domain/Entities/User";
import {AppConstants} from "@common/commonConstants";
import config from "config";
// import { FileFunctions } from "./fileFunctions";
import * as fs from "fs";

//const privateKey = config.get<string>("privateKey");
//const publicKey = config.get<string>("publicKey");
export class JWTFunctions {
  /**
   *
   * @param user
   * @param audienceId
   * @returns
   */
  public static GenerateToken(user: User, audienceId: string): string {
    // doesn´t works whitc this key loaded from config.
    // const privateKey2 = config.get<string>("server.privateKey");

    const payload = {
      _id: user.id,
      name: user.userName,
      role: user.roles
    };
    const audience = [audienceId];
    const expiresIn_minutes = parseInt(AppConstants.JWT_Expires) * 60;

    try {
      const privateKey = fs.readFileSync("./config/private_key.pem", "utf-8");
      // doesn´t works
      //const jwt2 = sign(payload, privateKey2, {expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString(), algorithm: "RS256"});

      const jwt = sign(payload, privateKey, {expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString(), algorithm: "RS256"});

      // it's less safe than RSA
      //return sign(payload, AppConstants.JWT_SECRET, {expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString()});
      return jwt;
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param token
   * @returns
   */
  public static Verify(token: Token): JwtPayload {
    const publicKey = fs.readFileSync("./config/public_key.pem", "utf-8");
    // it's less safe than RSA
    //const virification = verify(token.jwt, AppConstants.JWT_SECRET);
    const virification = verify(token.jwt, publicKey) as JwtPayload;

    return virification;
  }
}
