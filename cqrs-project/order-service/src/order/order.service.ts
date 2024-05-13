import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrderEntity } from '../entities';
import {
  CancelOrderCommand,
  ConfirmOrderCommand,
  CreateOrderCommand,
} from './commands';
import { ICreateOrderEvent, PlaceOrderDto } from './order.interface';
import { FindOneOrderQuery } from './queries';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('orderClient') private readonly orderService: ClientProxy,
    @Inject('customerClient') private readonly customerService: ClientProxy,
    @Inject('stockClient') private readonly stockService: ClientProxy,
  ) {
    this.orderService.connect();
    this.customerService.connect();
    this.stockService.connect();
  }

  async createOrder(placeOrderDto: PlaceOrderDto) {
    try {
      const order = await this.commandBus.execute(
        new CreateOrderCommand(placeOrderDto),
      );
      if (order) {
        this.orderService.emit({ cmd: 'orderCreated' }, order);
      }

      return order;
    } catch (error) {
      Logger.error('handleCreateOrder:error');
      Logger.error(error);
    }
  }

  async findOne(orderId: number): Promise<OrderEntity> {
    return await this.queryBus.execute(new FindOneOrderQuery(orderId));
  }

  async handleOrderConfirmedEvent(payload: { orderId: number }): Promise<void> {
    return await this.commandBus.execute(
      new ConfirmOrderCommand(payload.orderId),
    );
  }

  async handleOrderCancelledEvent(payload: { orderId: number }): Promise<void> {
    return await this.commandBus.execute(
      new CancelOrderCommand(payload.orderId),
    );
  }

  async processOrderCreated({
    customerId,
    orderId,
    products,
    totalAmount,
  }: ICreateOrderEvent): Promise<void> {
    try {
      const isPay = await firstValueFrom(
        this.customerService.send<boolean>(
          { cmd: 'processPayment' },
          {
            customerId,
            totalAmount,
          },
        ),
      );

      if (isPay) {
        this.customerService.emit(
          { cmd: 'customerValidated' },
          { orderId, customerId, products, totalAmount },
        );
      } else {
        Logger.verbose('processCustomerInvalidated');
        this.orderService.emit({ cmd: 'orderCancelled' }, { orderId });
      }
    } catch (error) {
      Logger.error('processOrderCreated:error');
      Logger.error(error);
    }
  }
}
