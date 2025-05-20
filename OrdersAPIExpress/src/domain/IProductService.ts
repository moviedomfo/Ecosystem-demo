import { ProductDto } from './DTOs/ProductDto';

export interface IProductService {
  
  GetByIU: (id: string) => Promise<ProductDto[]>;
  
}
