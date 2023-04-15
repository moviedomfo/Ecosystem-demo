import {User} from "@domain/Entities/User";
import {AuthenticationReq, AuthenticationRes} from "@domain/DTOs/Auth/AuthorizationDto";
import {AppConstants} from "@common/commonConstants";
import {ErrorCodeEnum, ErrorTypeEnum} from "@common/Enums/ErrorEnums";
import {AppError} from "@common/ErrorHandle/AppError";
import {ICacheRepository} from "./interfases/ICacheRepository";
import {IAuthService} from "@domain/interfases/IAuthService";
import {IUserRepository} from "./interfases/IUserRepository";
import {JWTFunctions} from "@common/helpers/jwtFunctions";
import RefreshTokenService from "@infra/repos/RefreshToken.service";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {LoginResultEnum} from "@common/Enums/LoginResultEnum";
import {RefreshTokenReq, RefreshTokenRes} from "@domain/DTOs/Auth/RefreshTokenDto";

export default class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository, private cacheRepository: ICacheRepository) {}

  public async RefreshToken(req: RefreshTokenReq): Promise<RefreshTokenRes> {
    if (!req.client_id) throw new AppError(HttpStatusCode.BAD_REQUEST, ErrorCodeEnum.PARAMETER_REQUIRED.toString(), "client_id is required not found", ErrorTypeEnum.TecnicalException);

    const refreshTokenService: RefreshTokenService = new RefreshTokenService(this.cacheRepository);

    const rtResult = await refreshTokenService.RefreshToken(req.refresh_token);

    let res: RefreshTokenRes = new RefreshTokenRes();

    /** this data comes from cached user data together with refresh_token   */
    const user: User = {
      id: rtResult.UserID,
      userName: "",
      email: "",
      pwd: undefined,
      phoneNumbers: [],
      roles: []
    };

    const jwt = JWTFunctions.GenerateToken(user, req.client_id);

    res.refresh_token = rtResult.Token;

    return res;
  }

  public async Auth(req: AuthenticationReq): Promise<AuthenticationRes> {
    const result: AuthenticationRes = new AuthenticationRes();
    const refreshTokenService: RefreshTokenService = new RefreshTokenService(this.cacheRepository);

    if (req.grant_type === "refresh_token") {
      const tokenData = await refreshTokenService.RefreshToken(req.refresh_token);

      const user: User = {
        id: tokenData.UserID,
        userName: "",
        email: '',
        pwd: undefined,
        phoneNumbers: [],
        roles: []
      };

      const jwt = JWTFunctions.GenerateToken(user, req.client_id);

      result.refresh_token = tokenData.Token;
      result.token = jwt;
    }
    if (req.grant_type === "password") {
      const user = await this.userRepository.FindByUserName(req.username);

      if (!user) throw new AppError(1, LoginResultEnum.LOGIN_USER_DOESNT_EXIST.toString(), "User not found", ErrorTypeEnum.SecurityException);

      const valid = this.userRepository.VerifyPassword(req.password, user.pwd);

      if (!valid) throw new AppError(1, LoginResultEnum.LOGIN_USER_OR_PASSWORD_INCORRECT.toExponential(), "Password is not correct", ErrorTypeEnum.SecurityException);
      const jwt = JWTFunctions.GenerateToken(user, req.client_id);

      const refreshToken = await refreshTokenService.CreateRefreshToken(user.id.toString(), "");

      result.refresh_token = refreshToken.Token;
      result.token = jwt;
      // const token: Token = {
      //   jwt,
      //   id: req.client_id,
      //   expire: refreshToken.Expires,
      //   refreshToken: refreshToken.Token,
      // };
    }

    return result;
  }
}
