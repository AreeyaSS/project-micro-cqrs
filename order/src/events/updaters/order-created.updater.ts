import { Redisk } from 'redisk';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { Order } from 'src/entities/order';
import { OrderItem } from 'src/entities/order-item';

@ViewUpdaterHandler(OrderCreatedEvent)
export class OrderCreatedUpdater implements IViewUpdater<OrderCreatedEvent> {
  constructor(private readonly redisk: Redisk) {}

  async handle(event: OrderCreatedEvent) {
    // public readonly id: string,
    // public readonly command: CreateOrderCommand,
    // public readonly created: Date,

    const { command } = event;
    // const order = new Order({
    //     customerId: body.customerId,
    //     orderItems: body.orderItems.map((orderItem) => new OrderItem(orderItem)),
    // });
    // await this.redisk.save<Order>(new Order(id, command, created));
    await this.redisk.save<Order>(
      new Order({
        customerId: command.customerId,
        orderItems: command.orderItems.map(
          (orderItem) => new OrderItem(orderItem),
        ),
      }),
    );
  }
}
