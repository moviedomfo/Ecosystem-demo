import { ProductDto } from './DTOs/ProductDto';
import { ProductBE } from "./Entities/ProductBE";

export interface IProductService {
  
  GetByIU: (id: string) => Promise<ProductDto[]>;
  
}
