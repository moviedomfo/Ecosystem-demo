import {OrderBE} from "@domain/Entities/OrderBE";
import {IOrderRepository} from "@application/interfases/IOrderRepository";
import {OrderDTO} from "@domain/DTOs/OrderDto";
import OrderSchema from "@infra/schema/Order.schema";
import {fileURLToPath} from "url";

/**Persist to mongodb Orders */
export default class OrdersMongoRepository implements IOrderRepository {
  public Insert(order: OrderDTO): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const now = new Date();

      const pschema = new OrderSchema({
        OrderId: order.OrderId,
        PersonId: order.PersonId,
        CreatedDate: now,
        OrderDetail: order.OrderDetail,
        Department: order.Department,
        Status: order.Status,
        GeneratedDate: order.GeneratedDate,
      });
      try {
        await pschema.save();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public GetById(id: string): Promise<OrderBE> {
    return new Promise<OrderBE>(async (resolve, reject) => {
      try {
        const res = await OrderSchema.findById(id);

        // const orderBE = {
        //   OrderId: res.OrderId,
        //   PersonId: res.PersonId,
        //   CreatedDate: res.CreatedDate,
        //   OrderDetail: res.OrderDetail,
        // };

        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async ClearAll(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await OrderSchema.collection.deleteMany({});
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public async GetByParams(startDate: Date, endDate: Date, includeDetails: boolean = false): Promise<OrderBE[]> {
    return new Promise<OrderBE[]>(async (resolve, reject) => {
      //createdAt
      const query = {
        GeneratedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      };

      let fields = includeDetails
        ? {
            OrderId: 1,
            PersonId: 1,
            Department: 1,
            createdAt: 1,
            Status: 1,
            OrderDetail: 1,
          }
        : {
            OrderId: 1,
            PersonId: 1,
            Department: 1,
            createdAt: 1,
            Status: 1,
          };
      try {
        const res = await OrderSchema.find(query, fields);

        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async GetAll(): Promise<OrderBE[]> {
    return new Promise<OrderBE[]>(async (resolve, reject) => {
      try {
        const res = await OrderSchema.find({});
        // const Orders: OrderBE[] = [];

        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}
