import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { ProductEntity } from '../entities';
import { IUpdateInventoryEvent, OrderItemDto } from './product.interface';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getProducts(): Promise<ProductEntity[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<ProductEntity> {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() productData: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productData: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'reserveStock' }, Transport.KAFKA)
  async reserveStock(payload: { products: OrderItemDto[] }): Promise<boolean> {
    return await this.productService.reserveStock(payload);
  }

  @MessagePattern({ cmd: 'updateInventory' }, Transport.KAFKA)
  async updateInventory(payload: {
    products: OrderItemDto[];
  }): Promise<boolean> {
    return await this.productService.updateInventory(payload);
  }

  @EventPattern({ cmd: 'stockReserved' }, Transport.KAFKA)
  async handleStockReserved(
    @Payload() payload: IUpdateInventoryEvent,
  ): Promise<void> {
    await this.productService.processStockReserved(payload);
  }

  @EventPattern({ cmd: 'stockNotAvailable' }, Transport.KAFKA)
  async handleStockNotAvailable(
    @Payload() payload: IUpdateInventoryEvent,
  ): Promise<void> {
    await this.productService.processStockNotAvailable(payload);
  }
}
