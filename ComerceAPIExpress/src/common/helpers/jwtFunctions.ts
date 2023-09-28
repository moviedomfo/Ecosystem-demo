import {verify, JwtPayload} from "jsonwebtoken";
import * as fs from "fs";
import {Token} from "@domain/Entities/Token";
import {FileFunctions} from "./fileFunctions";
import {AppConstants} from "@common/CommonConstants";

export class JWTFunctions {
  static folderPath = AppConstants.APP_FILES_PATH || "./files";
  /**
   *
   * @param token
   * @param clientId
   * @returns
   */
  public static Verify(token: Token, clientId: string): JwtPayload {
    const fileName = `${JWTFunctions.folderPath}/${clientId}_public_key.pem`;
    //const fileName = `./files/${clientId}_public_key.pem`;
    const publicKey = fs.readFileSync(fileName, "utf-8");

    // it's less safe than RSA
    //const virification = verify(token.jwt, AppConstants.JWT_SECRET);
    const virification = verify(token.jwt, publicKey) as JwtPayload;

    return virification;
  }

  /**
   *
   * @param publicKey
   * @param clientId
   */
  public static SavePublicKey(publicKey: string, clientId: string): void {
    // Verificar si la carpeta "files" existe, si no, crearla
    if (!fs.existsSync(JWTFunctions.folderPath)) {
      fs.mkdirSync(JWTFunctions.folderPath);
    }

    const fileName = `${JWTFunctions.folderPath}/${clientId}_public_key.pem`;

    FileFunctions.AppendFile(fileName, publicKey);
  }
}
