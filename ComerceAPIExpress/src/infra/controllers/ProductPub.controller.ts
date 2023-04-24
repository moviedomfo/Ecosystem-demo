import {CreateProductDto} from "@domain/DTOs/ProductDto";
import {NextFunction, Request, Response} from "express";
import {IProductService} from "@domain/IProductService";
import {GET, POST, route} from "awilix-express";

/**
 * A product
 */
@route("/api/products")
export default class ProductPubController {
  constructor(private readonly productService: IProductService) {}
  @route("/")
  @POST()
  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //let body: ImessageDto = JSON.parse(JSON.stringify(req.body));

      const productDTO: CreateProductDto = req.body.content as CreateProductDto;

      await this.productService.Create(productDTO);
      res.status(200).send();
      //else res.status(403).send();
    } catch (e) {
      next(e);
    }
  };
  @route("/getAll")
  @GET()
  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.productService.GetAll();

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
      const result = await this.productService.GetById(id);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  //public ClearAll = async (req: Request, res: Response, next: NextFunction) => {

  //   try {
  //     const result = await this.productService.ClearAll();
  //     res.status(200).send(true);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}
