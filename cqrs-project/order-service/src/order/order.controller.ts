import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern, Payload, Transport } from '@nestjs/microservices';
import { ICreateOrderEvent, PlaceOrderDto } from './order.interface';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post()
  // async createOrder(@Body() createOrderDto: PlaceOrderDto) {
  //   return await this.orderService.handleCreateOrder(createOrderDto);
  // }

  @Post()
  async createOrder(@Body() createOrderDto: PlaceOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  // @MessagePattern({ cmd: 'createOrder' }, Transport.KAFKA)
  // async createOrder(@Payload() createOrderDto: PlaceOrderDto): Promise<any> {
  //   return await this.orderService.createOrder(createOrderDto);
  // }

  @EventPattern({ cmd: 'orderCreated' }, Transport.KAFKA)
  async handleOrderCreated(
    @Payload() payload: ICreateOrderEvent,
  ): Promise<void> {
    await this.orderService.processOrderCreated(payload);
  }

  @EventPattern({ cmd: 'orderConfirmed' }, Transport.KAFKA)
  async handleOrderConfirmedEvent(
    @Payload() payload: { orderId: number },
  ): Promise<void> {
    await this.orderService.handleOrderConfirmedEvent(payload);
  }

  @EventPattern({ cmd: 'orderCancelled' }, Transport.KAFKA)
  async handleOrderCancelledEvent(
    @Payload() payload: { orderId: number },
  ): Promise<void> {
    await this.orderService.handleOrderCancelledEvent(payload);
  }
}
