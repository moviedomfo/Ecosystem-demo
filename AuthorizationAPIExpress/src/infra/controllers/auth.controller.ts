import {NextFunction, Request, Response} from "express";
import {POST, GET, route} from "awilix-express";
import {IAuthService} from "@domain/interfases/IAuthService";
import {AuthenticationReq} from "@domain/DTOs/Auth/AuthorizationDto";
import {RefreshTokenReq} from "@domain/DTOs/Auth/RefreshTokenDto";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {GetUserReq} from "@domain/DTOs/Auth/GetUserDto";

/**
 * A purchase order is issued by the buyer generator (¡random cron-job app) and and later is to be fulfilled by the vendor
 */
@route("/api/sec")
export default class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @route("/authenticate")
  @POST()
  public Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: AuthenticationReq = req.body as AuthenticationReq;
      const response = await this.authService.Auth(reqBody);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };

  @route("/RefreshToken")
  @GET()
  public RefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: RefreshTokenReq = req.body as RefreshTokenReq;

      const response = await this.authService.RefreshToken(reqBody);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
  @route("/GetUser")
  @GET()
  public GetUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: GetUserReq = req.body as GetUserReq;

      const response = await this.authService.GetUser(reqBody);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
}
