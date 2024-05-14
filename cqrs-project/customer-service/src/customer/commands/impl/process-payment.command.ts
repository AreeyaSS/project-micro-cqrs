export class ProcessPaymentCommand {
  constructor(
    public readonly customerId: string,
    public readonly totalAmount: number,
  ) {}
}
