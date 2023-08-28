import {CreateProductDto} from "@domain/DTOs/ProductDto";
import {ProductBE} from "@domain/Entities/ProductBE";

export interface IProductRepository {
  Create: (req: CreateProductDto) => Promise<string>;

  GetById: (id: string) => Promise<ProductBE>;
  GetAll: (name?: string, page?:number, pageSize?:number) => Promise<ProductBE[]>;
}
