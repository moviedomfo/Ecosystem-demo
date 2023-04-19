export class RefreshTokenReq {
  
    public  username :string;
    public  refresh_token :string;
    public  client_id:string;
  
  }
  
  export class RefreshTokenRes {
    
    public refresh_token: string;
    public jwt:string;
 
  }
  
  