import {User} from "@domain/Entities/User";

export class GetUserReq {
  public username: string;
}

export class GetUserRes {
  public User: User;
}
