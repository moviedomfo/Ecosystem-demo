import { PersonBE } from "./Entities/PersonBE";

export interface ICustommerService {

  /** */
  GetById: (id: string) => Promise<PersonBE>;

}
