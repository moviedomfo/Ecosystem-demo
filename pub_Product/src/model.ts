  
export class Product {
  public Id: string;
  public Name: string;
  
  public Cost:string;
  public Count:number;
  public Material :  string;
  public Unit :  string;
  public Lab :  string;
  
  public GeneratedDate :Date;
  public Description: string;
  public Department: string;
  public   GetFullName ():string {

    return `${this.Id }  ${this.Name } , ${this.Material}`   ;
  }
}
