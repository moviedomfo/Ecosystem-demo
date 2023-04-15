import {IUserRepository} from "@application/interfases/IUserRepository";
import {User} from "@domain/Entities/User";
import {compare, hash, hashSync} from "bcryptjs";
/**Persist to mongodb Orders */
export default class UserRepository implements IUserRepository {
  public FindByUserName(userName: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const user: User = {
          userName: "olecram",
          pwd: "olecram",
          email: "olecram@gmail.com",
          id: "100000",
          status: "Active",
          roles: ["secre", "user"],

          phoneNumbers: ["23423423423", "0998-3457688796"],
        };
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }
  /**
   *
   * @param password
   * @returns Hassed Passwword
   */
  public HassPassword(password: string): Promise<string> {
    //  Salt length to generate or salt to use, default to 10
    const salt = 12;
    return hash(password, salt);
  }

  /**
   *
   * @param password
   * @param hash
   * @returns
   */
  public VerifyPassword(password: string, hash: string): Promise<boolean> {
    //  Salt length to generate or salt to use, default to 10
    const salt = 12;
    return compare(password, hash);
  }
}
