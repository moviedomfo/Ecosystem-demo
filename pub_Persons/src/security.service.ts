import axios from 'axios';
import { AppSettings } from './AppSettings';
import { AuthenticationRes, AuthenticationReq, RefreshTokenRes, RefreshTokenReq } from './AuthorizationDto';

export default class SecurityService {

  public static currentLogin: AuthenticationRes | null = null;


  /**
 * 
 * @param userName 
 * @param password 
 * @returns 
 */
  async Auth(userName: string, password: string): Promise<AuthenticationRes> {
    const apiURL = `${AppSettings.BASE_URL_AUTH}/api/sec/authenticate`;
    const req: AuthenticationReq = {
      username: userName,
      password: password,
      grant_type: "password",
      client_id: AppSettings.HEADERS.clientid,

    };
    const config = {
      method: "post",
      url: apiURL,
      data: req
    };


    const res = await axios<AuthenticationRes>(config)

    const result = res.data;
    return result;

  };

  /**
* 
* @param userName 
* @param password 
* @returns 
*/
  async RefreshAuth(userName: string): Promise<RefreshTokenRes> {
    const apiURL = `${AppSettings.BASE_URL_AUTH}/api/sec/RefreshToken`;
    const req: RefreshTokenReq = {
      client_id: AppSettings.HEADERS.clientid,
      refresh_token: SecurityService.currentLogin.refresh_token,
      username: 'davendra'
    };
    const config = {
      method: "post",
      url: apiURL,
      data: req
    };


    const res = await axios<RefreshTokenRes>(config)

    const result = res.data;
    return result;

  };
}
