import { StorableEvent } from 'event-sourcing-nestjs';
import { CreateOrderCommand } from 'src/commands/impl/create-order.command';

export class OrderCreatedEvent extends StorableEvent {
  eventAggregate = 'order';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly command: CreateOrderCommand,
    public readonly created: Date,
  ) {
    super();
  }
}
