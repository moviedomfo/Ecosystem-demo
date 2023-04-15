import {NextFunction, Request, Response} from "express";
import {POST, GET, route} from "awilix-express";
import {IAuthService} from "@domain/interfases/IAuthService";
import {AuthenticationReq} from "@domain/DTOs/Auth/AuthorizationDto";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {GetRefreshTkReq} from "@domain/DTOs/Token/GetRefreshTkDto";
import RefreshTokenService from "@infra/repos/RefreshToken.service";
import {ICacheRepository} from "@application/interfases/ICacheRepository";
import {RemoveRefreshTkReq} from "@domain/DTOs/Token/RemoveRefreshTkDto";

/**
 * A purchase order is issued by the buyer generator (¡random cron-job app) and and later is to be fulfilled by the vendor
 */
@route("/api/tk")
export default class TokenController {
  constructor(private cacheRepository: ICacheRepository) {}

  // @route("/token")
  // @GET()
  // public Token = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const reqBody: GetRefreshTkReq = req.body as GetRefreshTkReq;

  //     const response = await this.authService.Auth(reqBody);
  //     res.status(HttpStatusCode.OK).send(response);
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  @route("/removeRefreshToken")
  @GET()
  public RemoveRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: RemoveRefreshTkReq = req.body as RemoveRefreshTkReq;
      const svc: RefreshTokenService = new RefreshTokenService(this.cacheRepository);
      await svc.Remove(reqBody.refresh_token);
      res.status(HttpStatusCode.OK).send("token removed");
    } catch (e) {
      next(e);
    }
  };

  @route("/RefreshToken")
  @GET()
  public RefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: GetRefreshTkReq = req.body as GetRefreshTkReq;
      const svc: RefreshTokenService = new RefreshTokenService(this.cacheRepository);
      const response = await svc.GetStoredRefreshToken(reqBody.refresh_token);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
}
