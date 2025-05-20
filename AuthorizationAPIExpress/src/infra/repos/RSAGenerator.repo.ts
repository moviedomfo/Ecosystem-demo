import HttpStatusCode from "@common/Enums/HttpStatusCode";
import { FileFunctions } from "@common/helpers";
import RSAGenerator from "@common/helpers/RSAGenerator";
import { RsaKeys } from "@domain/Entities/RSAHeys";
import { AppError } from "@common/ErrorHandle/AppError";
export default class RSAGeneratorRepository {
  static storage: { [key: string]: string };
  constructor() {
    RSAGeneratorRepository.CreateStore();
  }

  /**
   *
   * @param clientId registered client id
   * @returns
   */
  public async CreatePublicPrivateKeys(clientId: string): Promise<RsaKeys> {
    return new Promise(async (resolve) => {
      const gen = new RSAGenerator();

      const rsa = await gen.GetPublicPrivateKeys();

      FileFunctions.AppendFile(`./files/${clientId}_private_key.pem`, rsa.privateKey);
      FileFunctions.AppendFile(`./files/${clientId}_public_key.pem`, rsa.publicKey);
      RSAGeneratorRepository.storage[clientId] = JSON.stringify(rsa);

      resolve(rsa);
    });
  }

  /**
   *
   * @param clientId registered client id
   * @returns
   */
  public GetForClient = (clientId: string): RsaKeys | undefined => {
    try {
      const rsaJson = RSAGeneratorRepository.storage[clientId];
      if (!rsaJson) throw new AppError(HttpStatusCode.NOT_FOUND, "0", "The client isn´t registered in out registry yet");
      const rsaKeys = JSON.parse(rsaJson) as RsaKeys;
      return rsaKeys;
    } catch (err) {
      if (err instanceof AppError) throw err;

      throw new Error("RSA Gen->" + err.message);
    }
  };

  static CreateStore() {
    if (RSAGeneratorRepository.storage === undefined) {
      RSAGeneratorRepository.storage = {};
    }
  }
}
