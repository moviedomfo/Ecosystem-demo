import {DateFunctions} from "../common/helpers";
import {RefreshToken} from "../domain/Entities/RefreshToken";

export const CreateRefreshToken = (token: string): RefreshToken => {
    const expireAt = DateFunctions.getExpirationDate(1);
  
    let refresh_token: RefreshToken = {
      Token: token,
      Expires: expireAt,
      Created: DateFunctions.getCurrent(),
      UserID: "10000",
      CreatedByIp: "192.168.2.3"
    };
  
    return refresh_token;
  };

  