import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventBus } from "event-sourcing-nestjs";
import { DateFactory } from "src/common/date.factory";
import { UpdateUserCommand } from "../impl/update-user.command";
import { UserUpdatedEvent } from "src/users/events/impl/user-updated.event";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly dateFactory: DateFactory
  ) {}

  async execute(command: UpdateUserCommand) {
    await this.eventBus.publish(
      new UserUpdatedEvent(
        command.id,
        command.name,
        command.email,
        this.dateFactory.now()
      )
    );
    return {
      data: {
        id: command.id,
        name: command.name,
        email: command.email,
        updated: this.dateFactory.now()
      }
    };
  }
}
