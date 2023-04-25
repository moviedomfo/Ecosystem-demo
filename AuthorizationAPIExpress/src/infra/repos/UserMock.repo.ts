import {MokUsers, User} from "@domain/Entities/User";
import {IUserRepository} from "@application/interfases/IUserRepository";
import {compare, hash, hashSync} from "bcryptjs";
const mockData = require("../../../assets/usermok.json");

/**Persist to mongodb Orders */
export default class UserMockRepository implements IUserRepository {
  private static MokUsers: MokUsers;

  private static async LoadUsers() {
    if (!UserMockRepository.MokUsers) UserMockRepository.MokUsers = mockData as MokUsers;
  }

  public async GetUserById(userId: string): Promise<User> {
    await UserMockRepository.LoadUsers();

    const user = UserMockRepository.MokUsers.Users.find((p) => p.id === userId);
    return user;
  }

  public async FindByUserName(userName: string): Promise<User> {
    await UserMockRepository.LoadUsers();

    const user = UserMockRepository.MokUsers.Users.find((p) => p.userName === userName);

    return user;
  }

  /**
   *
   * @param password
   * @returns Hassed Passwword
   */
  public HassPassword(password: string): Promise<string> {
    //  Salt length to generate or salt to use, default to 10
    const saltWorkFactor = 12;
    return hash(password, saltWorkFactor);
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
