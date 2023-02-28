import {OrderDTO} from "@domain/DTOs/OrderDto";
import {OrderBE} from "./Entities/OrderBE";

export interface IOrdersService {
  GetById: (id: string) => Promise<OrderBE>;
  CreateOrder: (req: OrderDTO, origin: string) => Promise<void>;
  GetAll: () => Promise<OrderBE[]>;
  GetByParams: (
    startDate: Date,
    endDate: Date,
    includeDetails: boolean
  ) => Promise<OrderBE[]>;
  ClearAll: () => Promise<any>;
}
