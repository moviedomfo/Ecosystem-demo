import { OrderBE } from "@domain/Entities/OrderBE";
import {  CreateOrderReq } from "@domain/DTOs/OrderDto";
import OrdersSQLRepository from "@infra/repos/OrderSQL.repo";
import dayjs from 'dayjs';

export class OrdersService {
  
  
  constructor(private ordersRepo: OrdersSQLRepository) {
    // this._ordersRepo = ordersRepo;
    // this._eventBusRepo = eventBusRepo;
  }

  public async Create(order: CreateOrderReq): Promise<string> {

     
    const generatedDateString = dayjs(order.GeneratedDate).format(
      'YYYY-MM-DD HH:mm:ss.SSS'
    );
    order.GeneratedDate = new Date(generatedDateString);
    order.GeneratedDate = new Date();
    const id = await this.ordersRepo.Insert(order);
 
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
