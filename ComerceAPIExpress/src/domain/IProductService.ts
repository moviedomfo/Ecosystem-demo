import {ProductBE} from "./Entities/ProductBE";
import {CreateProductDto} from "./DTOs/ProductDto";

export interface IProductService {
  Create: (req: CreateProductDto) => Promise<string>;

  GetById: (id: string) => Promise<ProductBE>;
  GetAll: (name?: string, page?: number, pageSize?: number) => Promise<ProductBE[]>;
}
