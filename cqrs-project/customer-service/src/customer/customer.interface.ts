import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}

export interface IProcessPaymentEvent {
  orderId: number;
  customerId: number;
  totalAmount: number;
  products: OrderItemDto[];
}

interface OrderItemDto {
  productId: number;
  quantity: number;
  price: number;
}
