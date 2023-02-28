import {IOrdersService} from "./../domain/IOrderService";
import {OrderBE} from "@domain/Entities/OrderBE";
import {IOrderRepository} from "./interfases/IOrderRepository";
import {ImessageDto} from "@domain/DTOs/MessageDto";
import {IEventBusRepository} from "./interfases/IEventBusRepository";
import {CreateOrderReq, OrderDTO} from "@domain/DTOs/OrderDto";
import {v4 as uuidv4} from "uuid";

export default class OrdersService implements IOrdersService {
  private readonly _ordersRepo: IOrderRepository;
  private readonly _eventBusRepo: IEventBusRepository;
  constructor(
    private ordersRepo: IOrderRepository,
    private eventBusRepo: IEventBusRepository
  ) {
    this._ordersRepo = ordersRepo;
    this._eventBusRepo = eventBusRepo;
  }

  // @Post("/message")
  public async CreateOrder(order: OrderDTO, origin: string): Promise<void> {
    order.OrderId = uuidv4();
    order.Status = "created";
    try {
      await this._ordersRepo.Insert(order);

      const msg: ImessageDto = {
        command: "CreateOrderEvent",
        content: JSON.stringify(order),
        key: order.OrderId,
        origin: origin,
      };

      /** send to Event Buss */
      await this._eventBusRepo.PushToQueue(msg, "orders");
    } catch (err) {
      throw err;
    }
  }

  // @Get("/getAll")
  public async GetAll(): Promise<OrderBE[]> {
    return this._ordersRepo.GetAll();
  }
  public async GetByParams(
    startDate: Date,
    endDate: Date,
    includeDetails: boolean = false
  ): Promise<OrderBE[]> {
    if (startDate > endDate) {
      throw new Error(`Fecha inicio debe ser menor o igual fecha fin`);
    }
    return this._ordersRepo.GetByParams(startDate, endDate, includeDetails);
  }
  public async GetById(id: string): Promise<OrderBE> {
    return this._ordersRepo.GetById(id);
  }

  public async ClearAll(): Promise<any> {
    return this._ordersRepo.ClearAll();
  }
}
