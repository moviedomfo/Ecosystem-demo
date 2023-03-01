import { ExeptionFunctions } from '../utils/handleErrorFunctions';
import { OrderDTO } from './../models/Order';
import { OrderDetailsSchema, OrdersSchema } from './sql.schemas';
import dayjs from 'dayjs';

/**Persist to mongodb Persons */
export default class OrdersRepository {
  public Insert(req: OrderDTO): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      // const f2 = dayjs(req.GeneratedDate).toISOString();
      // const f3 = dayjs(req.GeneratedDate).format("YYYY-MM-DD HH:mm:ss.SSS");
      // const f4 = dayjs(req.GeneratedDate.toString()).toDate();
      const generatedDateString = dayjs(req.GeneratedDate).format(
        'YYYY-MM-DD HH:mm:ss.SSS'
      );

      const order = {
        // OrderId: req.OrderId,
        PersonId: req.PersonId,
        Department: req.Department,
        Status: req.Status,
        // DeliverryStatus: req.DeliverryStatus,
        CreatedDate: generatedDateString,
        // CloudId: "Comerce",
      };

      try {
        const orderdata = await OrdersSchema.create(order, {});
        const orderId = orderdata.getDataValue('OrderId');

        req.OrderDetail.forEach(async (det) => {
          const orderDet = {
            OrderId: orderId,
            ProductId: det.ProductId,
            Quantity: det.Quantity,
            Unit: det.Unit,
          };
          await OrderDetailsSchema.create(orderDet, {});
        });
        resolve(orderId);
      } catch (error) {
        let e = new Error(
          'Insert into SQL errors : ' + ExeptionFunctions.GetMessageError(error)
        );
        reject(e);
      }
    });
  }

  public GetById(id: string): Promise<OrderDTO> {
    return new Promise<OrderDTO>(async (resolve) => {
      const res = await OrdersSchema.findByPk(id);
      const order: OrderDTO = {
        OrderId: '',
        PersonId: '',
        Department: '',
        Status: 'created',
        DeliverryStatus: 'shipped',
        GeneratedDate: undefined,
        OrderDetail: [],
      };
      resolve(order);
    });
  }
}
