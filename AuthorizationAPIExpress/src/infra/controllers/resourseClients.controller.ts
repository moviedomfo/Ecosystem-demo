
import { NextFunction, Request, Response } from "express";
import { IAuthService } from "@domain/interfases/IAuthService";
import { AuthenticationReq } from "@domain/DTOs/Auth/AuthorizationDto";
import { RefreshTokenReq } from "@domain/DTOs/Auth/RefreshTokenDto";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import RSAGeneratorRepository from "@infra/repos/RSAGenerator.repo";

/**
 * Controller responsible for handling RSA key pair operations for resource clients.
 * 
 * Provides endpoints to retrieve and generate public/private key pairs associated with a client.
 * Ensures that private keys are never exposed in API responses.
 * 
 * @remarks
 * This controller interacts with the RSAGeneratorRepository to manage RSA keys for clients.
 * All responses will omit the private key for security reasons.
 */

export default class ResourseClientsController {
  constructor(private readonly rsaGeneratorRepository: RSAGeneratorRepository) { }

  /**
   * Retrieves the RSA public key for a given client.
   * 
   * This method fetches the RSA key pair associated with the specified clientId,
   * but only returns the public key in the API response. The private key is omitted
   * for security reasons.
   * 
   * @method getPK
   * @param req - Express request object, expects clientId in query parameters.
   * @param res - Express response object.
   * @param next - Express next middleware function.
   */
  public getPK = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clientId } = req.query;
      const response = await this.rsaGeneratorRepository.GetForClient(clientId.toString());

      res.status(HttpStatusCode.OK).send({ ...response, privateKey: "" });
    } catch (e) {
      next(e);
    }
  };

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public generatePK = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clientId } = req.query;

      const response = await this.rsaGeneratorRepository.CreatePublicPrivateKeys(clientId.toString());
      res.status(HttpStatusCode.OK).send({ ...response, privateKey: "" });
    } catch (e) {
      next(e);
    }
  };
}
