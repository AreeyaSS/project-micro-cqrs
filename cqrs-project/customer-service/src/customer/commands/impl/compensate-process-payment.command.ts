export class CompensateProcessPaymentCommand {
  constructor(
    public readonly customerId: string,
    public readonly totalAmount: number,
  ) {}
}
