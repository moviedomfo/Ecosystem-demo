import {PersonBE} from "@domain/Entities/PersonBE";

export interface IPersonsRepository {
  ClearAll: () => Promise<void>;
  Insert: (req: PersonBE) => Promise<string>;
  GetById: (id: string) => Promise<PersonBE>;
  GetAll: (name?: string) => Promise<PersonBE[]>;
}
