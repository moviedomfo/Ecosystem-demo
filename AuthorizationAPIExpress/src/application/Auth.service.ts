import {User} from "@domain/Entities/User";
import {AuthenticationReq, AuthenticationRes} from "@domain/DTOs/Auth/AuthorizationDto";
import {ErrorCodeEnum, ErrorTypeEnum} from "@common/Enums/ErrorEnums";
import {AppError} from "@common/ErrorHandle/AppError";
import {IAuthService} from "@domain/interfases/IAuthService";
import {IUserRepository} from "./interfases/IUserRepository";
import {JWTFunctions} from "@common/helpers/jwtFunctions";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {LoginResultEnum} from "@common/Enums/LoginResultEnum";
import {RefreshTokenReq, RefreshTokenRes} from "@domain/DTOs/Auth/RefreshTokenDto";
import {GetUserReq, GetUserRes, UserSimpleViewDTO} from "@domain/DTOs/Auth/GetUserDto";
import {IRefreshTokenService} from "@domain/interfases/IRefreshTokenService";

export default class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository, private refreshTokenService: IRefreshTokenService) {}

  public async RefreshToken(req: RefreshTokenReq): Promise<RefreshTokenRes> {
    if (!req.client_id) throw new AppError(HttpStatusCode.BAD_REQUEST, ErrorCodeEnum.PARAMETER_REQUIRED.toString(), "client_id is required not found", ErrorTypeEnum.TecnicalException);

    const tokenData = await this.refreshTokenService.RefreshToken(req.refresh_token);

    let res: RefreshTokenRes = new RefreshTokenRes();

    /** this data comes from cached user data together with refresh_token   */
    const user: User = await this.userRepository.FindByUserName(tokenData.UserID);

    const jwt = JWTFunctions.GenerateToken(user, req.client_id,req.client_id);

    res.refresh_token = tokenData.Token;
    res.jwt = jwt;
    return res;
  }

  public async Auth(req: AuthenticationReq): Promise<AuthenticationRes> {
    const result: AuthenticationRes = new AuthenticationRes();

    if (req.grant_type === "refresh_token") {
      const tokenData = await this.refreshTokenService.RefreshToken(req.refresh_token);

      const user: User = await this.userRepository.GetUserById(tokenData.UserID);

      const jwt = JWTFunctions.GenerateToken(user, req.client_id,req.client_id);

      result.refresh_token = tokenData.Token;
      result.token = jwt;
    }
    if (req.grant_type === "password") {
      const user = await this.userRepository.FindByUserName(req.username);

      if (!user) throw new AppError(HttpStatusCode.UNAUTHORIZED, LoginResultEnum.LOGIN_USER_DOESNT_EXIST.toString(), "User not found", ErrorTypeEnum.SecurityException);

      const valid = await this.userRepository.VerifyPassword(req.password, user.passwordHash);

      if (!valid) throw new AppError(1, LoginResultEnum.LOGIN_USER_OR_PASSWORD_INCORRECT.toExponential(), "Password is not correct", ErrorTypeEnum.SecurityException);
      const jwt = JWTFunctions.GenerateToken(user, req.client_id,req.client_id);

      const refreshToken = await this.refreshTokenService.CreateRefreshToken(user.id.toString(), "");

      result.refresh_token = refreshToken.Token;
      result.token = jwt;
    }

    return result;
  }

  public async GetUser(req: GetUserReq): Promise<GetUserRes> {
    const result: GetUserRes = new GetUserRes();

    const user = await this.userRepository.FindByUserName(req.username);

    if (!user) throw new AppError(HttpStatusCode.UNAUTHORIZED, LoginResultEnum.LOGIN_USER_DOESNT_EXIST.toString(), "User not found", ErrorTypeEnum.SecurityException);

    const userSimpleView: UserSimpleViewDTO = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      fullName: `${user.lastName}, ${user.name}`,
      avatar: user.avatar
    };
    result.User = userSimpleView;

    return result;
  }
}
