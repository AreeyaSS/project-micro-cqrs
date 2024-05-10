import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from 'event-sourcing-nestjs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderCreatedEvent } from 'src/events/impl/order-created.event';
import { UidGenerator } from 'src/common/uid-generator';
import { DateFactory } from 'src/common/date.factory';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly uid: UidGenerator,
    private readonly dateFactory: DateFactory,
  ) {}

  async execute(command: CreateOrderCommand) {
    // สร้าง UUIDs เพื่อควบคุมสถานะซ้ำ
    const id = this.uid.generate();
    this.eventBus.publish(
      new OrderCreatedEvent(id, command, this.dateFactory.now()),
    );
    return id;
  }
}
