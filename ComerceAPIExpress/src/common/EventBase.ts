import {evetBusRepo} from "@common/ContainerOk";
import {IEventBusRepository} from "@application/interfases/IEventBusRepository";
import EntityBase from "./EntityBase";

export default abstract class EventBase {
  protected CommandName: string;
  protected Origin: string;
  protected readonly EventBusRepo: IEventBusRepository;
  protected Content: EntityBase;
  constructor(commandName: string, content: EntityBase, origin: string) {
    this.EventBusRepo = evetBusRepo;
    this.CommandName = commandName;
    this.Content = content;
    this.Origin = origin;
  }
  // protected Emit(message : Type) : void;
  //abstract Emit(): void;

  abstract Emit(): Promise<void>;
}
