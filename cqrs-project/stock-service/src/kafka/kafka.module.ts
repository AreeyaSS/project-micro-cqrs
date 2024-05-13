import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'customerClient',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'customer',
            brokers: ['localhost:9092'],
            ssl: false,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
      {
        name: 'orderClient',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order',
            brokers: ['localhost:9092'],
            ssl: false,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
      {
        name: 'stockClient',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'stock',
            brokers: ['localhost:9092'],
            ssl: false,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
