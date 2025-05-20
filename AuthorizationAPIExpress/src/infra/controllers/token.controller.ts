import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import { GetRefreshTkReq } from "@domain/DTOs/Token/GetRefreshTkDto";
import { JWTFunctions } from "@common/helpers/jwtFunctions";
import { VerifyJWTReq } from "@domain/DTOs/Token/VerifyJWTDto";
import { Token } from "@domain/Entities/Token";
import RefreshTokenService from "@application/RefreshToken.service";

/**
 * Controller responsible for handling token operations.
 */
export default class TokenController {
  constructor(
    private readonly refreshTokenService: RefreshTokenService) { }

  public GetRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: GetRefreshTkReq = req.body as GetRefreshTkReq;
      const response = await this.refreshTokenService.GetStoredRefreshToken(reqBody.refresh_token);
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };

  public GetAllToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.refreshTokenService.GetAllToken();
      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };

  public DelRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tk } = req.query;
      await this.refreshTokenService.Remove(tk.toString());
      res.status(HttpStatusCode.OK).send(`token ${tk} was removed `);
    } catch (e) {
      next(e);
    }
  };

  public VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: VerifyJWTReq = req.body as VerifyJWTReq;
      const tk: Token = new Token();
      tk.jwt = reqBody.jwt;
      const response = JWTFunctions.Verify(tk, reqBody.clientId);

      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
  public GetByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const tokenKey = req.query.tokenKey as string;
      const response = await this.refreshTokenService.GetStoredRefreshToken(tokenKey);

      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
  public GetByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const userId = req.query.userId as string;
      const response = await this.refreshTokenService.GetByUserId(userId);

      res.status(HttpStatusCode.OK).send(response);
    } catch (e) {
      next(e);
    }
  };
} 
