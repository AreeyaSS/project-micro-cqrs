import { QueryHandler } from '@nestjs/cqrs';
import { Redisk } from 'redisk';
import { User } from 'src/orders/entities/user.entity';
import { GetUsersQuery } from '../impl';
import { IQueryHandler } from '@nestjs/cqrs/dist/interfaces';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly redisk: Redisk) {}

  async execute(query: GetUsersQuery) {
    return await this.redisk.list<User>(User);
  }
}
