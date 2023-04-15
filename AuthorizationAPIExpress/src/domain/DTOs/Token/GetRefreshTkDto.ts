import { RefreshToken } from '@domain/Entities/RefreshToken';
export class GetRefreshTkReq {
  /**RefreshToken puro */
  public  refresh_token :string;
}

export class GetRefreshTkRes {
  /**RefreshToken en chache */
  public refresh_token: RefreshToken;
  
}

