import {verify, sign, JwtPayload} from "jsonwebtoken";

import {Token} from "@domain/Entities/token";
import {User} from "@domain/Entities/User";
import {AppConstants} from "@common/commonConstants";

export class JWTFunctions {
  /**
   *
   * @param user
   * @param audienceId
   * @returns
   */
  public static GenerateToken(user: User, audienceId: string): string {
    const payload = {
      _id: user.id,
      name: user.userName,
      role: user.roles
    };
    const audience = [audienceId];
    const expiresIn_minutes = parseInt(AppConstants.JWT_Expires) * 60;
    try {
      const jwt = sign(payload, AppConstants.JWT_SECRET, {expiresIn: expiresIn_minutes, audience, issuer: AppConstants.JWT_issuer.toString()});
      return jwt;
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param token
   * @returns
   */
  public static Verify(token: Token): string | JwtPayload {
    const virification = verify(token.jwt, AppConstants.JWT_SECRET);

    return virification;
  }
}
