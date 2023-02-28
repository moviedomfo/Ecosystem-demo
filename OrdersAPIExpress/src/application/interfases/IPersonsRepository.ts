import { PersonBE } from "@domain/Entities/PersonBE";

export interface IPersonsRepository {

  GetById: (id: string) => Promise<PersonBE>;
}