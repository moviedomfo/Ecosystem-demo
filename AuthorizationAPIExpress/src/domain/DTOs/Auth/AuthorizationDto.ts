export class AuthenticationReq {
  
  public  username :string;
  public  password :string;
  public  grant_type :string;

  /**allows to identify user data store o */
  public  client_id:string;
  //public  client_secret :string;
  public  refresh_token? :string;
}

export class AuthenticationRes {
  public token: string;
  public refresh_token: string;


}

