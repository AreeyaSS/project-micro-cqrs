import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandModule } from './commands/command.module';
import { QueryModule } from './queries/query.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule, CqrsModule, CommandModule, QueryModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
