
export class PersonBE {
    public Id: string;
    public FirstName: string;
    public Lastname: string;
    public City:string;
    public Phone :  string;
    public DocNumber :  string;
    
    public GeneratedDate :Date;
    public GetFullName ():string {

      return `${this.Id }  ${this.Lastname } , ${this.FirstName} from ${this.City}`   ;
    }
  }
  
  