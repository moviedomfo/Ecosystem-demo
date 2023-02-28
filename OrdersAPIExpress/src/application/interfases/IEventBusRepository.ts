import { ImessageDto } from "@domain/DTOs/MessageDto";

export interface IEventBusRepository {
  PushToQueue: (message: ImessageDto, topic: string) => Promise<void>;
}
