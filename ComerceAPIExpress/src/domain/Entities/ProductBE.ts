import {Entity} from "@common/CleanBases/Entity";
import {count} from "console";

export class ProductBE extends Entity<string> {
  public Name: string;

  public Cost: string;
  public Count: number;
  public Material: string;
  public Unit: string;
  public Lab: string;
  public GeneratedDate: Date;
  public Description: string;
  public Department: string;
  // public GetFullName(): string {
  //   return `${this.Id}  ${this.Name} , ${this.Material}`;
  // }

  static Create(object: any): ProductBE {
    const {Id, Name, Cost, Count, Unit, Lab, Description, Department, GeneratedDate, CreatedDate} = object;
    const item: ProductBE = new ProductBE(Id);

    item.Name = Name;
    item.Cost = Cost;
    item.Count = Count;
    item.Unit = Unit;
    item.Lab = Lab;
    item.Description = Description;
    item.Department = Department;
    item.GeneratedDate = GeneratedDate;
    // item.CreatedDate = CreatedDate;

    return item;
  }
}
