import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandModule } from './commands/command.module';
import { QueryModule } from './queries/query.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule, CqrsModule, CommandModule, QueryModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
