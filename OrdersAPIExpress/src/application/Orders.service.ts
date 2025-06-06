import { IOrdersService } from "@domain/IOrdersService";
import { OrderBE } from "@domain/Entities/OrderBE";
import { IOrderRepository } from "./interfases/IOrderRepository";
import { ImessageDto } from "@domain/DTOs/MessageDto";
import { IEventBusRepository } from "./interfases/IEventBusRepository";
import { CreateOrderReq, OrderDTO } from "@domain/DTOs/OrderDto";
import { v4 as uuidv4 } from "uuid";

export class OrderService implements IOrdersService {
  // private readonly _ordersRepo: IOrderRepository;
  // private readonly _eventBusRepo: IEventBusRepository;
  constructor(private ordersRepo: IOrderRepository, private eventBusRepo: IEventBusRepository) {
    // this._ordersRepo = ordersRepo;
    // this._eventBusRepo = eventBusRepo;
  }

  public async CreateOrder(order: OrderDTO, origin: string): Promise<string> {
    order.OrderId = uuidv4();
    order.Status = "created";
    // try {
    const id = await this.ordersRepo.Insert(order);

    const msg: ImessageDto = {
      command: "CreateOrderEvent",
      content: JSON.stringify(order),
      key: id,
      origin: origin,
    };

    /** send to Event Buss */
    await this.eventBusRepo.PushToQueue(msg, "orders");

    return id;
  }

  public async GetAll(): Promise<OrderBE[]> {
    return this.ordersRepo.GetAll();
  }
  public async GetByParams(startDate: Date, endDate: Date, includeDetails: boolean = false): Promise<OrderBE[]> {
    if (startDate > endDate) {
      throw new Error(`Fecha inicio debe ser menor o igual fecha fin`);
    }
    return this.ordersRepo.GetByParams(startDate, endDate, includeDetails);
  }
  public async GetById(id: string): Promise<OrderBE> {
    return this.ordersRepo.GetById(id);
  }

  public async ClearAll(): Promise<any> {
    return this.ordersRepo.ClearAll();
  }
}
