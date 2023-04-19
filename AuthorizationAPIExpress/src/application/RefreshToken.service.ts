import {RefreshToken} from "@domain/Entities/RefreshToken";
import {AppError} from "../common/ErrorHandle/AppError";
import {AppConstants} from "@common/commonConstants";
import {v4 as uuidv4} from "uuid";
import {ICacheRepository} from "@application/interfases/ICacheRepository";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {ErrorTypeEnum} from "@common/Enums/ErrorEnums";
import {DateFunctions} from "@common/helpers";
import {IRefreshTokenService} from "@domain/interfases/IRefreshTokenService";
import dayjs from "dayjs";

/**
 *
 *
 */
export default class RefreshTokenService implements IRefreshTokenService {
  constructor(private cacheRepository: ICacheRepository) {}

  /** Check existent RefreshToken stored in cache and if every is ok regenerate new RefreshToken
   * and return it.
   */
  public async RefreshToken(tokenKey: string): Promise<RefreshToken> {
    return new Promise<RefreshToken>(async (resolve, reject) => {
      try {
        const rt = await this.cacheRepository.GetTk(tokenKey);

        // if nop error es throwed. tk is ok
        await this.VerifyToken(rt);
        // at this poin we'll try to re-generate refresh token
        const newRefreshToken = await this.CreateRefreshToken(rt.UserID, rt.CreatedByIp);

        resolve(newRefreshToken);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async CreateRefreshToken(userId: string, clientIp: string): Promise<RefreshToken> {
    return new Promise<RefreshToken>(async (resolve, reject) => {
      try {
        const expireAt = DateFunctions.getExpirationDate(parseInt(AppConstants.JWT_ExpiresRefreshToken));

        const _token = uuidv4();

        const rt: RefreshToken = {
          Token: _token,
          Expires: expireAt,
          Created: DateFunctions.getCurrent(),
          UserID: userId,
          CreatedByIp: clientIp
        };
        await this.cacheRepository.PushTk(rt, rt.Token);
        resolve(rt);
      } catch (err) {
        reject(err);
      }
    });
  }

  //** veirfy . If not exist or is invalid return AppError */
  public async VerifyToken(refreshToken: RefreshToken) {
    /**here we can check anythng else */
    if (!refreshToken) {
      throw new AppError(HttpStatusCode.UNAUTHORIZED, "4400", "Refresh token expired or not exist", ErrorTypeEnum.TecnicalException);
    }

    /**IsExpired */
    if (refreshToken == null || this.IsExpired(refreshToken)) {
      const fe = new AppError(HttpStatusCode.UNAUTHORIZED, "4401", "Refresh token expired", ErrorTypeEnum.TecnicalException);
      throw fe;
    }
  }

  public IsExpired(refreshToken: RefreshToken): boolean {
    // Fecha almacenada en caché
    const expireAt = dayjs(refreshToken.Expires);
    // Fecha actual en formato UTC
    const currentDate = dayjs();

    // Si expireAt en caché es anterior a la fecha actual -> Expiro
    const expired = expireAt.isBefore(dayjs(currentDate));

    return expired;
  }

  /** Check existent RefreshToken stored in cache and if every is ok regenerate new RefreshToken
   * and return it.
   */
  public async GetStoredRefreshToken(tokenKey: string): Promise<RefreshToken> {
    return new Promise<RefreshToken>(async (resolve, reject) => {
      try {
        const rt = await this.cacheRepository.GetTk(tokenKey);
        if (!rt) throw new AppError(HttpStatusCode.UNAUTHORIZED, "4400", "Refresh token was expired or not exist", ErrorTypeEnum.TecnicalException);

        resolve(rt);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async Remove(tokenKey: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.cacheRepository.Remove(tokenKey);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  public async GetAllToken(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allItems = await this.cacheRepository.GetAll();

        resolve(allItems);
      } catch (err) {
        reject(err);
      }
    });
  }
}
