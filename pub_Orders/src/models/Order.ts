export class CreateOrderReq {
  public Content: OrderDTO;
  public Origin: string;

}
export class OrderDTO {
  public _id: string;
  public OrderId: string;
  public PersonId: string;
  public Department: string;
  public Status: 'created' | 'confirmed' | 'shipped';
  public DeliverryStatus: "shipped" | "arrived" | "collected";

  public GeneratedDate: Date;

  public OrderDetail: OrderItemsDto[] = [];
}

export class OrderItemsDto {
  public ProductId: string;
  public Quantity: number;
  public Unit: string;
}
