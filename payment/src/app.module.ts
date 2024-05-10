import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AuthorizePaymentController } from './usecases/authorize-payment/authorize-payment.controller';
import { PaymentRepository } from './repositories/memory/payment.repository';
import { PaymentService } from './services/payment.service';
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
  controllers: [AuthorizePaymentController],
  providers: [
    {
      provide: 'payment-repository',
      useClass: PaymentRepository,
    },
    {
      provide: 'payment-service',
      useClass: PaymentService,
    },
  ],
})
export class AppModule {}
