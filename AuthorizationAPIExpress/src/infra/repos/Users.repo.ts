import {MokUsers, User} from "@domain/Entities/User";
import {IUserRepository} from "@application/interfases/IUserRepository";
import {FileFunctions} from "@common/helpers";
import {compare, hash, hashSync} from "bcryptjs";

async () => {
  const usersJson = await FileFunctions.OpenFile("./assets/usermok.json");
  const mokUsers: MokUsers = JSON.parse(usersJson) as MokUsers;
  UserRepository.setUsers(mokUsers);
};

/**Persist to mongodb Orders */
export default class UserRepository implements IUserRepository {
  private static MokUsers: MokUsers;

  public static async setUsers(mokUsers) {
    UserRepository.MokUsers = mokUsers;
  }
  private static async LoadUsers() {
    const usersJson = await FileFunctions.OpenFile("./assets/usermok.json");
    const mokUsers: MokUsers = JSON.parse(usersJson) as MokUsers;
    UserRepository.MokUsers = mokUsers;
  }

  public async GetUserById(userId: string): Promise<User> {
    if (UserRepository.MokUsers.Users.length === 0) {
      await UserRepository.LoadUsers();
    }
    const user = UserRepository.MokUsers.Users.find((p) => p.id === userId);
    return user;
  }

  public async FindByUserName(userName: string): Promise<User> {
    if (!UserRepository.MokUsers) {
      await UserRepository.LoadUsers();
    }
    const user = UserRepository.MokUsers.Users.find((p) => p.userName === userName);

    return user;
  
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
