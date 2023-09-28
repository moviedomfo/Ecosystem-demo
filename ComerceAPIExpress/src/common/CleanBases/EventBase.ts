import {evetBusRepo} from "@common/ContainerOk";
import {IEventBusRepository} from "@application/interfases/IEventBusRepository";
import { Entity } from "./Entity";

export default abstract class EventBase {
  protected CommandName: string;
  protected Origin: string;
  protected readonly EventBusRepo: IEventBusRepository;
  protected Content: Entity<string>;
  constructor(commandName: string, content: Entity<string>, origin: string) {
    this.EventBusRepo = evetBusRepo;
    this.CommandName = commandName;
    this.Content = content;
    this.Origin = origin;
  }
  // protected Emit(message : Type) : void;
  //abstract Emit(): void;

  abstract Emit(): Promise<void>;
}
