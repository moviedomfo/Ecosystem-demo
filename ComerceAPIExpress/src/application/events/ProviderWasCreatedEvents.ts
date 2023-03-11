import EntityBase from "@common/EntityBase";
import EventBase from "@common/EventBase";
import {IKafkaMessageDto} from "@domain/DTOs/MessageDto";

export default class ProviderWasCreatedEvent extends EventBase {
  constructor(content: EntityBase, origin: string) {
    super("ProviderWasCreated", content, origin);
  }

  //** */
  async Emit(): Promise<void> {
    const msg: IKafkaMessageDto = {
      key: this.Content.Id.toString(),
      command: this.CommandName,
      content: JSON.stringify(this.Content),
      origin: this.Origin,
    };

    /** send to Event Buss */
    await this.EventBusRepo.PushToQueue(msg, "providers");
  }
}
