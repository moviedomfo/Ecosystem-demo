import {User} from "@domain/Entities/User";

export class GetUserReq {
  public username: string;
}

export class GetUserRes {
  public User: UserSimpleViewDTO;
}
export interface UserSimpleViewDTO {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  avatar: string;
  
 
}