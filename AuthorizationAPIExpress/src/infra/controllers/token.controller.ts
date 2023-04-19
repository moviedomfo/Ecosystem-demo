import {NextFunction, Request, Response} from "express";
import {GET, route, DELETE} from "awilix-express";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {GetRefreshTkReq} from "@domain/DTOs/Token/GetRefreshTkDto";
import {IRefreshTokenService} from "@domain/interfases/IRefreshTokenService";

/**
 * A purchase order is issued by the buyer generator (¡random cron-job app) and and later is to be fulfilled by the vendor
 */
@route("/api/tk")
export default class TokenController {
  constructor(private refreshTokenService: IRefreshTokenService) {}

  @route("/GetRefreshToken")
  @GET()
  public GetRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: GetRefreshTkReq = req.body as GetRefreshTkReq;
      const response = await this.refreshTokenService.GetStoredRefreshToken(reqBody.refresh_token);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };

  @route("/GetAllToken")
  @GET()
  public GetAllToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.refreshTokenService.GetAllToken();
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };

  @route("/DelRefreshToken")
  @DELETE()
  public DelRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {tk} = req.query;
      await this.refreshTokenService.Remove(tk.toString());
      res.status(HttpStatusCode.OK).send(`token ${tk} was removed `);
    } catch (e) {
      next(e);
    }
  };
}
