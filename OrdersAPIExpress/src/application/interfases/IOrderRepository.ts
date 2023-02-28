import {OrderDTO} from "@domain/DTOs/OrderDto";
import {OrderBE} from "@domain/Entities/OrderBE";

export interface IOrderRepository {
  Insert: (req: OrderDTO) => Promise<void>;
  GetById: (id: string) => Promise<OrderBE>;
  GetAll: () => Promise<OrderBE[]>;
  GetByParams: (
    startDate: Date,
    endDate: Date,
    includeDetails: boolean
  ) => Promise<OrderBE[]>;
  ClearAll: () => Promise<any>;
}
