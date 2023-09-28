import {CreateProductDto} from "@domain/DTOs/ProductDto";
import {NextFunction, Request, Response} from "express";
import {IProductService} from "@domain/IProductService";

/**
 * Product controller
 */

export default class ProductPubController {
  constructor(private readonly productService: IProductService) {}

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

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {name, page, pageSize} = req.query;
      const currentPage = parseInt(page as string) || 1; // Página actual
      const limit = parseInt(pageSize as string) || 10; // Tamaño de página

      const result = await this.productService.GetAll(name?.toString() || null, currentPage, limit);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

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
