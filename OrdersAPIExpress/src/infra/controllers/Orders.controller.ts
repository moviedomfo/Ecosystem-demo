import {CreateOrderReq} from "@domain/DTOs/OrderDto";
import {IOrdersService} from "@domain/IOrderService";
import {NextFunction, Request, Response} from "express";
import {parseBoolean} from "@common/helpers/paramsValidators";
import {GET, POST, DELETE, route} from "awilix-express";

/**
 * A purchase order is issued by the buyer generator (¡random cron-job app) and and later is to be fulfilled by the vendor
 */
@route("/api/orders")
export default class OrdersController {
  // private readonly _ordersService: IOrdersService;

  constructor(private readonly ordersService: IOrdersService) {
    // this._ordersService = ordersService;
  }
  @route("/")
  @POST()
  public OrderCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqBody: CreateOrderReq = req.body as CreateOrderReq;

      await this.ordersService.CreateOrder(reqBody.Content, reqBody.Origin);
      res.status(200).send(reqBody.Content);
      //else res.status(403).send();
    } catch (e) {
      console.log("push err  " + JSON.stringify(e));
      next(e);
    }
  };
  @route("/")
  @GET()
  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.ordersService.GetAll();
      //const result = JSON.stringify(req.body);
      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  @route("/getByParams")
  @GET()
  public GetByParams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.query.startDate || !req.query.endDate)
        throw new Error(`Fecha inicio o de fin son obligatorias`);

      const startDate = new Date(req.query.startDate.toString());
      const endDate = new Date(req.query.endDate.toString());
      let includeDetails: boolean = null;
      if (req.query.includeDetails)
        includeDetails = parseBoolean(req.query.includeDetails.toString());

      // req.startDate = dayjs(req.fechadesde.toString()).toDate(); // uso de DaysJS
      // req.endDate = new Date(req.fechahasta.toString()); // uso de build-in Date
      const orders = await this.ordersService.GetByParams(
        startDate,
        endDate,
        includeDetails
      );
      const result = {
        length: orders.length,
        data: orders,
      };
      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  @route("/:id")
  @GET()
  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await this.ordersService.GetById(id);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
  // @route("/")
  @DELETE()
  public ClearAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.ordersService.ClearAll();
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  };
}
