import {NextFunction, Request, Response} from "express";
import {IAuthService} from "@domain/interfases/IAuthService";
import {AuthenticationReq} from "@domain/DTOs/Auth/AuthorizationDto";
import {RefreshTokenReq} from "@domain/DTOs/Auth/RefreshTokenDto";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import RSAGeneratorRepository from "@infra/repos/RSAGenerator.repo";

/**
 * A purchase order is issued by the buyer generator (¡random cron-job app) and and later is to be fulfilled by the vendor
 */

export default class ResourseClientsController {
  constructor(private readonly rsaGeneratorRepository: RSAGeneratorRepository) {}


  public getPK = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {clientId} = req.query;
      const response = await this.rsaGeneratorRepository.GetForClient(clientId.toString());

      res.status(HttpStatusCode.OK).send({...response, privateKey: ""});
    } catch (e) {
      next(e);
    }
  };


  public generatePK = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {clientId} = req.query;

      const response = await this.rsaGeneratorRepository.CreatePublicPrivateKeys(clientId.toString());
      res.status(HttpStatusCode.OK).send({...response, privateKey: ""});
    } catch (e) {
      next(e);
    }
  };
}
