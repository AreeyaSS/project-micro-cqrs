import { OrderRepository } from './repositories/memory/order.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DynamicModule, Module } from '@nestjs/common';
import config from './config';
import { CreateOrderController } from './usecases/create-order/create-order.controller';
import { OrderService } from './services/order.service';
import { CreateOrderSaga } from './usecases/create-order/saga/create-order.saga';
import { PlaceOrderStep } from './usecases/create-order/saga/steps/place-order.step';
import { CheckProductsAvailibityStep } from './usecases/create-order/saga/steps/check-product-availibilty.step';
import { AuthorizePaymentStep } from './usecases/create-order/saga/steps/authorize-payment.step';
import { ConfirmOrderStep } from './usecases/create-order/saga/steps/confirm-order.step';
import { UpdateStockStep } from './usecases/create-order/saga/steps/update-stock.step';
import { RediskModule } from 'redisk-nestjs';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { StateUpdaters } from './events/updaters';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from './common/common.module';

@Module({})
//   {
//   imports: [
//     CqrsModule,
//     CommonModule,
//     ClientsModule.register([
//       {
//         name: config().services.inventory.name,
//         transport: Transport.KAFKA,
//         options: {
//           client: {
//             clientId: config().services.order.clientId,
//             brokers: [config().broker],
//           },
//           consumer: {
//             groupId: config().services.inventory.groupId,
//           },
//         },
//       },
//       {
//         name: config().services.payment.name,
//         transport: Transport.KAFKA,
//         options: {
//           client: {
//             clientId: config().services.order.clientId,
//             brokers: [config().broker],
//           },
//           consumer: {
//             groupId: config().services.payment.groupId,
//           },
//         },
//       },
//     ]),
//     // Redis เป็น read storage
//     RediskModule.forRoot({ url: 'redis://localhost:6379/0' }),
//     EventSourcingModule.forRoot({
//       mongoURL:
//         'mongodb://mongoadmin:mongoadmin@localhost:27017/eventstore?directConnection=true&authSource=admin',
//     }),
//   ],
//   controllers: [CreateOrderController],
//   providers: [
//     ...CommandHandlers,
//     ...EventHandlers,
//     ...StateUpdaters,
//     {
//       provide: 'order-repository',
//       useClass: OrderRepository,
//     },
//     {
//       provide: 'place-order-step',
//       useClass: PlaceOrderStep,
//     },
//     {
//       provide: 'check-products-availibity',
//       useClass: CheckProductsAvailibityStep,
//     },
//     {
//       provide: 'authorize-payment',
//       useClass: AuthorizePaymentStep,
//     },
//     {
//       provide: 'confirm-order',
//       useClass: ConfirmOrderStep,
//     },
//     {
//       provide: 'update-stock',
//       useClass: UpdateStockStep,
//     },
//     {
//       provide: 'create-order-saga',
//       useClass: CreateOrderSaga,
//     },
//     {
//       provide: 'order-service',
//       useClass: OrderService,
//     },
//   ],
// }
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        CqrsModule,
        CommonModule,
        ClientsModule.register([
          {
            name: config().services.inventory.name,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: config().services.order.clientId,
                brokers: [config().broker],
              },
              consumer: {
                groupId: config().services.inventory.groupId,
              },
            },
          },
          {
            name: config().services.payment.name,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: config().services.order.clientId,
                brokers: [config().broker],
              },
              consumer: {
                groupId: config().services.payment.groupId,
              },
            },
          },
        ]),
        // Redis เป็น read storage
        RediskModule.forRoot({ url: 'redis://localhost:6379/0' }),
        EventSourcingModule.forRoot({
          mongoURL:
            'mongodb://mongoadmin:mongoadmin@localhost:27017/eventstore?directConnection=true&authSource=admin',
        }),
      ],
      controllers: [CreateOrderController],
      providers: [
        ...CommandHandlers,
        ...EventHandlers,
        ...StateUpdaters,
        {
          provide: 'order-repository',
          useClass: OrderRepository,
        },
        {
          provide: 'place-order-step',
          useClass: PlaceOrderStep,
        },
        {
          provide: 'check-products-availibity',
          useClass: CheckProductsAvailibityStep,
        },
        {
          provide: 'authorize-payment',
          useClass: AuthorizePaymentStep,
        },
        {
          provide: 'confirm-order',
          useClass: ConfirmOrderStep,
        },
        {
          provide: 'update-stock',
          useClass: UpdateStockStep,
        },
        {
          provide: 'create-order-saga',
          useClass: CreateOrderSaga,
        },
        {
          provide: 'order-service',
          useClass: OrderService,
        },
      ],
    };
  }
}
