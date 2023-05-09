import {verify, sign, JwtPayload} from "jsonwebtoken";
import * as fs from "fs";
import { Token } from "@domain/Entities/Token";


export class JWTFunctions {

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
