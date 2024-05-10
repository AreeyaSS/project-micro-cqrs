export class CreateOrderCommand {
  constructor(
    public readonly customerId: string,
    public readonly orderItems: any[],
  ) {}
}
