import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CustomerEntity } from '../entities';
import {
  CompensateProcessPaymentCommand,
  CreateCustomerCommand,
  ProcessPaymentCommand,
} from './commands';
import { CreateCustomerDto, IProcessPaymentEvent } from './customer.interface';
import { FindOneCustomerQuery } from './queries';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomerService {
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

  async findOne(id: string): Promise<CustomerEntity> {
    return await this.queryBus.execute(new FindOneCustomerQuery(id));
  }

  // async findOne(id: ObjectId): Promise<CustomerEntity> {
  //   const customer = await this.customerRepository.findOne({
  //     where: { _id: id },
  //   });
  //   if (!customer) {
  //     throw new NotFoundException('Customer not found');
  //   }
  //   return customer;
  // }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return await this.commandBus.execute(
      new CreateCustomerCommand(createCustomerDto),
    );
  }

  async processPayment(payload: {
    customerId: string;
    totalAmount: number;
  }): Promise<boolean> {
    return await this.commandBus.execute(
      new ProcessPaymentCommand(payload.customerId, payload.totalAmount),
    );
  }

  async compensateProcessPayment(payload: {
    customerId: string;
    totalAmount: number;
  }): Promise<boolean> {
    return await this.commandBus.execute(
      new CompensateProcessPaymentCommand(
        payload.customerId,
        payload.totalAmount,
      ),
    );
  }

  async processCustomerValidated({
    orderId,
    customerId,
    products,
    totalAmount,
  }: IProcessPaymentEvent): Promise<void> {
    try {
      const isStockReserve = await firstValueFrom(
        this.stockService.send<boolean>(
          { cmd: 'updateInventory' },
          { products },
        ),
      );
      if (isStockReserve) {
        this.orderService.emit({ cmd: 'orderConfirmed' }, { orderId });
      } else {
        this.stockService.emit(
          { cmd: 'stockNotAvailable' },
          {
            orderId,
            customerId,
            products,
            totalAmount,
          },
        );
      }
    } catch (error) {
      Logger.error('processStockReserved:error');
      Logger.error(error);
    }
  }
}
