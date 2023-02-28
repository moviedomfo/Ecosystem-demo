import {PersonBE} from "./../../domain/Entities/PersonBE";
import {ImessageDto} from "@domain/DTOs/MessageDto";
import {NextFunction, Request, Response} from "express";
import {IPersonsService} from "@domain/IPersonsService";
import {GET, POST, route} from "awilix-express";

@route("/api/persons")
export default class PersonsPubController {
  //private readonly _personsService: IPersonsService;

  constructor(private readonly personsService: IPersonsService) {
    //  this._personsService = personsService;
  }
  @route("/providers")
  @GET()
  public GetAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.personsService.GetAllProviders();

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
  @route("/customer")
  @POST()
  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body: ImessageDto = JSON.parse(JSON.stringify(req.body));
      let person: PersonBE = JSON.parse(JSON.stringify(body.content));
      //const f = new Date(person.GeneratedDate);
      //person.GeneratedDate = new Date(person.GeneratedDate);
      await this.personsService.ArriveNew_Customer(person, body.origin);
      //await personsService.ArriveNew_Customer(person, body.origin);

      res.status(200).send();
    } catch (e) {
      next(e);
    }
  };
  @route("/customers")
  @GET()
  public GetAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {name, lastname} = req.query;
      //const name = req.query.name;
      //const result = await personsService.GetAllCustomers(name);
      const result = await this.personsService.GetAllCustomers();

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
  @route("/customer/:id")
  @GET()
  public GetCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      // const result = await personsService.GetCustomerById(id);
      const result = await this.personsService.GetCustomerById(id);
      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  @route("/providers/:id")
  @GET()
  public GetProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      // const result = await personsService.GetProviderById(id);
      const result = await this.personsService.GetProviderById(id);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
  @route("/clearall")
  @GET()
  public ClearAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.personsService.ClearAll();
      res.status(200).send(true);
    } catch (e) {
      next(e);
    }
  };
}
