import {RefreshToken} from "@domain/Entities/RefreshToken";

export interface IRefreshTokenService {
  RefreshToken(tokenKey: string): Promise<RefreshToken>;
  CreateRefreshToken(userId: string, clientIp: string): Promise<RefreshToken>;
  VerifyToken(refreshToken: RefreshToken);
  IsExpired(refreshToken: RefreshToken): boolean;
  GetStoredRefreshToken(tokenKey: string): Promise<RefreshToken>;
  Remove(tokenKey: string): Promise<void>;
  GetAllToken(): Promise<any[]>;
  
}
