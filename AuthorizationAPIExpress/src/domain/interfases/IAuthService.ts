import {RefreshTokenReq, RefreshTokenRes} from "@domain/DTOs/RefreshTokenDto";
import {AuthenticationReq, AuthenticationRes} from "@domain/DTOs/Auth/AuthorizationDto";

export interface IAuthService {
  /** */
  RefreshToken: (req: RefreshTokenReq) => Promise<RefreshTokenRes>;
  /** */
  Auth: (req: AuthenticationReq) => Promise<AuthenticationRes>;
}
