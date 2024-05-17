import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../impl/create-user.command";
import { UserCreatedEvent } from "src/users/events/impl/user-created.event";
import { StoreEventBus } from "event-sourcing-nestjs";
import { UidGenerator } from "src/common/uid-generator";
import { DateFactory } from "src/common/date.factory";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly uid: UidGenerator,
    private readonly dateFactory: DateFactory
  ) {}

  async execute(command: CreateUserCommand) {
    // สร้าง UUIDs เพื่อควบคุมสถานะซ้ำ
    const id = this.uid.generate();
    await this.eventBus.publish(
      new UserCreatedEvent(
        id,
        command.name,
        command.email,
        this.dateFactory.now()
      )
    );
    return {
      data: {
        id: id,
      }
    };
  }
}
