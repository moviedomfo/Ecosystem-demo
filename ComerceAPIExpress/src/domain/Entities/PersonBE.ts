import {Entity} from "@common/CleanBases/Entity";

export class PersonBE extends Entity<string> {
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

  static Create(object: any): PersonBE {

    const {Id,Name,Lastname,City,Phone,kafka_Topic,DocNumber,GeneratedDate,CreatedDate}=object;
    const person: PersonBE = new PersonBE(Id);
    person.Name = Name;
    person.Lastname = Lastname;
    person.City = City;
    person.Phone = Phone;
    person.kafka_Topic = kafka_Topic;
    person.DocNumber = DocNumber;
    person.GeneratedDate = GeneratedDate;
    person.CreatedDate = CreatedDate;

    return person;
  }
}
