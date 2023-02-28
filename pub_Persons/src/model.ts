
export class Person {
    public Id: string;
    public Name: string;
    public Lastname: string;
    public City:string;
    public Phone :  string;
    public GeneratedDate :Date;
    public DocNumber: string;
    public   GetFullName ():string {

      return `${this.GeneratedDate }  ${this.Lastname } , ${this.Name} from ${this.City}`   ;
    }
  }
  