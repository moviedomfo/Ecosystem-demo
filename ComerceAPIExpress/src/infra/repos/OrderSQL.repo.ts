import { OrderBE } from "@domain/Entities/OrderBE";
import { CreateOrderReq } from "@domain/DTOs/OrderDto";
import { fileURLToPath } from "url";

import { OrderDetailsSchema, OrdersSchema } from "@infra/schemas/sql.OrderDetailsSchema";
import { Transaction } from "sequelize";

/**Persist to SQL Orders */
export default class OrdersSQLRepository {
  public async Insert(order: CreateOrderReq): Promise<string> {
    const t = await OrdersSchema.sequelize?.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // Opcional
    });;
    try {

      const item = {
        ExternalOrderId: order.OrderId,
        PersonId: order.PersonId,
        CreatedDate: order.GeneratedDate.toISOString(),
        Department: order.Department,
        Status: order.Status,
        // CreatedDate: order.GeneratedDate,
      };

      const savedOrder = await OrdersSchema.create(item, { transaction: t });

      const orderId = savedOrder.getDataValue('OrderId');

      const orderDetails = order.OrderDetail.map((detail: any) => ({
        OrderId: orderId,
        ProductId: detail.ProductId,
        Quantity: detail.Quantity,

        Unit: detail.Unit,
      }));
      if (orderDetails.length > 0) {
        console.log("OrderDetails:", orderDetails);
        await OrderDetailsSchema.bulkCreate(orderDetails, { transaction: t });
      }
      // order.OrderDetail.forEach(async (det) => {
      //   const orderDet = {
      //     OrderId: orderId,
      //     ProductId: det.ProductId,
      //     Quantity: det.Quantity,
      //     Unit: det.Unit,
      //   };
      //   await OrderDetailsSchema.create(orderDet, {});
      // });

      console.log("Order._ID generado por SQL:", orderId);


      await t?.commit();
      return orderId;
    } catch (err) {
      await t?.rollback();

      console.error("Error al insertar Order:", err);
      throw err;
    }
  }


  public GetById(externalId: string): Promise<OrderBE> {
    return new Promise<OrderBE>(async (resolve, reject) => {
      try {
    const res = await OrdersSchema.findOne({
        where: { ExternalOrderId: externalId },
      });

        if (!res) {
          resolve(null as any); // or reject(new Error("Order not found"));
          return;
        }

        const orderBE: OrderBE = {
          ExternalOrderId: res.getDataValue("ExternalOrderId"),
          OrderId: res.getDataValue("OrderId"),
          PersonId: res.getDataValue("PersonId"),
          CreatedDate: res.getDataValue("CreatedDate"),
          Department: res.getDataValue("Department"),
          Status: res.getDataValue("Status"),
          OrderDetail: []
        };

        resolve(orderBE);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async ClearAll(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        //await OrdersSchema.({});
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
        // const res = await OrdersSchema.findAll(query, fields);

        resolve([]); // Placeholder for actual implementation
      } catch (err) {
        reject(err);
      }
    });
  }

  public async GetAll(): Promise<OrderBE[]> {
    return new Promise<OrderBE[]>(async (resolve, reject) => {
      try {
        const res = await OrdersSchema.findAll({});
        // const Orders: OrderBE[] = [];

        const orders: OrderBE[] = res.map((order: any) => ({
          ExternalOrderId: order.getDataValue("ExternalOrderId"),
          OrderId: order.getDataValue("OrderId"),
          PersonId: order.getDataValue("PersonId"),
          CreatedDate: order.getDataValue("CreatedDate"),
          Department: order.getDataValue("Department"),
          Status: order.getDataValue("Status"),
          OrderDetail: [] // You may want to fetch details if needed
        }));

        resolve(orders);
      } catch (err) {
        reject(err);
      }
    });
  }
}
