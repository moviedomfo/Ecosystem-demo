
import {AuthenticationReq, AuthenticationRes} from "@domain/DTOs/Auth/AuthorizationDto";
import { GetUserReq, GetUserRes } from "@domain/DTOs/Auth/GetUserDto";
import { RefreshTokenReq, RefreshTokenRes } from "@domain/DTOs/Auth/RefreshTokenDto";

export interface IAuthService {
  /** */
  RefreshToken: (req: RefreshTokenReq) => Promise<RefreshTokenRes>;
  /** */
  Auth: (req: AuthenticationReq) => Promise<AuthenticationRes>;
  GetUser: (req: GetUserReq) => Promise<GetUserRes>;

}
