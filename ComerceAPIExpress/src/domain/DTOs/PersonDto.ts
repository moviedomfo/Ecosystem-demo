export class CreatePersonDto {
  
  public Name: string;
  public Lastname: string;
  public City: string;
  public Phone: string;

  public kafka_Topic: string;
  public DocNumber: string;
  public GeneratedDate: Date;
  public CreatedDate: Date;
}

