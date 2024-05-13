import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export interface IUpdateInventoryEvent {
  orderId: number;
  customerId: number;
  products: OrderItemDto[];
  totalAmount: number;
}
