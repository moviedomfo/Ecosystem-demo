// export class CreateOrderReq {
//   public Content: OrderDTO;
//   public Origin: string;

// }

export class CreateOrderReq {
  public OrderId: string;
  public PersonId: string;
  public Department: string;
  public Status: "created" | "confirmed" | "shipped";
  public DeliverryStatus: "shipped" | "arrived" | "collected";

  public GeneratedDate: Date;
  public CreatedDate: Date;
  public OrderDetail: CreateOrderItemsDto[];
}

export class CreateOrderItemsDto {
  public ProductId: string;
  public Quantity: number;
  public Unit: string;
}
