import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerEntity } from '../../../entities';
import { FindOneCustomerQuery } from '../impl';
import { ObjectId } from 'mongodb';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerQueryHandler
  implements IQueryHandler<FindOneCustomerQuery>
{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async execute({ customerId }: FindOneCustomerQuery): Promise<CustomerEntity> {
    const oidValue = customerId['$oid'];
    const objectId = new ObjectId(oidValue);
    // return await this.customerRepository.findOne({ where: { id: objectId } });
    // return await this.customerRepository.findOneById(objectId);
    console.log(
      await this.customerRepository.findOne({ where: { id: customerId } }),
    );
    return {
      fullName: 'Test Sor',
      balance: 5000,
      id: '664320ca9126fe27b1215421',
    };
  }
}
