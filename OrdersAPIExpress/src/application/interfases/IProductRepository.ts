import { ProductBE } from "@domain/Entities/ProductBE";

export interface IProductRepository {
  
  
  GetById: (id: string) => Promise<ProductBE>;
  GetAll: () => Promise<ProductBE[]>;
}
