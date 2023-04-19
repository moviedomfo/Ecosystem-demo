import {User} from "src/domain/Entities/User";

export interface IUserRepository {
  FindByUserName: (userName: string) => Promise<User>;
  GetUserById: (userId: string) => Promise<User>;
  HassPassword:(password: string)=> Promise<string> ;
  VerifyPassword:(password: string, hash: string)=> Promise<boolean> ;

}
