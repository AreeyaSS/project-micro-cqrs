import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandModule } from './commands/command.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { QueryModule } from './queries/query.module';
import { KafkaModule } from '../kafka/kafka.module';
@Module({
  imports: [KafkaModule, CqrsModule, CommandModule, QueryModule],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
