export class PersonBE {

  public Id: string;
  public Name: string;
  public Lastname: string;
  public City: string;
  public Phone: string;

  public kafka_Topic: string;
  public DocNumber: string;
  public GeneratedDate: Date;
  public CreatedDate: Date;

  // public GetFullName(): string {
  //   return `${this.Id}  ${this.Lastname} , ${this.Name} from ${this.City}`;
  // }
}
