import {RsaKeys} from "@domain/Entities/RSAHeys";
import * as crypto from "crypto";


/**Only responsibly  create RSA public and provate key*/
export default class RSAGenerator {
  /**
   * Este código genera una pareja de llaves RSA con una longitud de 4096 bits y devuelve la llave pública y privada en formato PEM.
   * @returns RsaKeys whith private and publick ke 
   */
  public async GetPublicPrivateKeys(): Promise<RsaKeys> {
    return new Promise(async (resolve) => {
      const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048, // Tamaño de la clave en bits
        publicKeyEncoding: {
          type: "spki", // Estandar para la llave publica
          format: "pem" // Formato de codificación de la llave publica
        },
        privateKeyEncoding: {
          type: "pkcs8", // Estandar para la llave privada
          format: "pem" // Formato de codificación de la llave privada
        }
      });
 
   
      const res: RsaKeys = {
        publicKey,
        privateKey
      };

      resolve(res);
    });
  }


}
