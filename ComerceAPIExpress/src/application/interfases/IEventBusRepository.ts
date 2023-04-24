import {IKafkaMessageDto} from "@domain/DTOs/MessageDto";

export interface IEventBusRepository {
  /**
   * @message
   * @topic eg: kafka topic
   */
  PushToQueue: (message: IKafkaMessageDto, topic: string) => Promise<void>;
}
