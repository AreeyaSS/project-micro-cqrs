import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { CreateCustomerDto, IProcessPaymentEvent } from './customer.interface';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.createCustomer(
      createCustomerDto,
    );

    return { customer };
  }

  @Get(':id')
  async getCustomer(@Param('id') id: number) {
    const customer = await this.customerService.findOne(id);
    return { customer };
  }

  @MessagePattern({ cmd: 'processPayment' }, Transport.KAFKA)
  async processPayment(
    @Payload() payload: { customerId: number; totalAmount: number },
  ): Promise<boolean> {
    return await this.customerService.processPayment(payload);
  }

  @EventPattern({ cmd: 'refundPayment' }, Transport.KAFKA)
  async compensateProcessPayment(
    @Payload() payload: { customerId: number; totalAmount: number },
  ): Promise<boolean> {
    return await this.customerService.compensateProcessPayment(payload);
  }

  @EventPattern({ cmd: 'customerValidated' }, Transport.KAFKA)
  async handleCustomerValidated(
    @Payload() payload: IProcessPaymentEvent,
  ): Promise<void> {
    await this.customerService.processCustomerValidated(payload);
  }
}
