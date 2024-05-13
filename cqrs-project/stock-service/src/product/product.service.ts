import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductEntity } from 'src/entities';
import {
  CreateProductCommand,
  DeleteProductCommand,
  ReserveStockCommand,
  UpdateInventoryCommand,
  UpdateProductCommand,
} from './commands';
import { IUpdateInventoryEvent, OrderItemDto } from './product.interface';
import { FindAllProductsQuery, FindOneProductQuery } from './queries';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
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

  async getProducts(): Promise<ProductEntity[]> {
    return await this.queryBus.execute(new FindAllProductsQuery());
  }

  async getProductById(productId: number): Promise<ProductEntity> {
    return await this.queryBus.execute(new FindOneProductQuery(productId));
  }

  async createProduct(
    productData: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    return await this.commandBus.execute(new CreateProductCommand(productData));
  }

  async updateProduct(
    productId: number,
    productData: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    return await this.commandBus.execute(
      new UpdateProductCommand(productId, productData),
    );
  }

  async reserveStock(payload: { products: OrderItemDto[] }): Promise<boolean> {
    return await this.commandBus.execute(
      new ReserveStockCommand(payload.products),
    );
  }

  async updateInventory(payload: {
    products: OrderItemDto[];
  }): Promise<boolean> {
    return await this.commandBus.execute(
      new UpdateInventoryCommand(payload.products),
    );
  }

  async deleteProduct(productId: number): Promise<void> {
    return await this.commandBus.execute(new DeleteProductCommand(productId));
  }

  async processStockReserved({
    orderId,
    products,
  }: IUpdateInventoryEvent): Promise<void> {
    try {
      const isStockReserve = await firstValueFrom(
        this.stockService.send<boolean>(
          { cmd: 'updateInventory' },
          { products },
        ),
      );
      if (isStockReserve) {
        this.orderService.emit({ cmd: 'orderConfirmed' }, { orderId });
      }
    } catch (error) {
      Logger.error('processStockReserved:error');
      Logger.error(error);
    }
  }

  async processStockNotAvailable({
    orderId,
    customerId,
    totalAmount,
  }: IUpdateInventoryEvent): Promise<void> {
    this.customerService.emit(
      { cmd: 'refundPayment' },
      {
        customerId,
        totalAmount,
      },
    );

    this.orderService.emit({ cmd: 'orderCancelled' }, { orderId });
  }
}
