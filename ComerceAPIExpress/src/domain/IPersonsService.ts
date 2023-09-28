import { CreatePersonDto } from "./DTOs/PersonDto";
import {PersonBE} from "./Entities/PersonBE";

export interface IPersonsService {
  /**
   * registro de nuevo cliente online
   */
  ArriveNew_Customer: (req: CreatePersonDto, origin: string) => Promise<void>;

  /**
   *
   * @req : Person BE
   * @memberof IPersonsService
   */
  ArriveNew_Provider: (req: CreatePersonDto, origin: string) => Promise<void>;

/**
 * 
 * @param id Customer Id
 * @returns 
 */
  GetCustomerById: (id: string) => Promise<PersonBE>;
  
/**
 * 
 * @param id Provider Id
 * @returns 
 */
  GetProviderById: (id: string) => Promise<PersonBE>;
//  GetAllCustomers: (name?: string, page: number, limit: number) => Promise<PersonBE[]>;
  GetAllCustomers: (name?: string, page?: number, limit?: number ) => Promise<PersonBE[]>;

  GetAllProviders: (page?: number, limit?: number) => Promise<PersonBE[]>;
  ClearAll: () => Promise<void>;
}
