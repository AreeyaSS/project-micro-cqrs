import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import { ProductRepository } from './repositories/memory/product.repository';
import { CheckProductAvailibityController } from './usecases/fetch-availible-products/check-products-availiblity.controller';
import { UpdateStockController } from './usecases/update-stock/update-stock.controller';
import { ProductService } from './services/product.service';
import { RediskModule } from 'redisk-nestjs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    // Redis เป็น read storage
    RediskModule.forRoot({ url: 'redis://localhost:6379/0' }),
    EventSourcingModule.forRoot({
      mongoURL:
        'mongodb://mongoadmin:mongoadmin@localhost:27017/eventstore?directConnection=true&authSource=admin',
    }),
  ],
  controllers: [CheckProductAvailibityController, UpdateStockController],
  providers: [
    {
      provide: 'product-repository',
      useClass: ProductRepository,
    },
    {
      provide: 'product-service',
      useClass: ProductService,
    },
  ],
})
export class AppModule {}
