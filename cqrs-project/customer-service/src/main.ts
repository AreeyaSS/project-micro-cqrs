import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';
import cluster from 'cluster';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);

      // Fork workers, just separate 2 worker for test
      for (let i = 0; i < 2; i++) {
        cluster.fork();
      }

      cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
      });

      cluster.on('exit', (worker, code, signal) => {
        console.log(
          `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
        );
        console.log('Starting a new worker');
        cluster.fork();
      });
    } else {
      const app = await NestFactory.create(AppModule);
      // app.connectMicroservice({
      //   // name: 'customerClient',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'customer',
      //       brokers: ['localhost:9092'],
      //       ssl: false,
      //     },
      //     // producer: {
      //     //   allowAutoTopicCreation: true,
      //     // },
      //     // consumer: {
      //     //   groupId: 'customer',
      //     // },
      //   },
      // });

      // await app.startAllMicroservices();
      await app.listen(4002);
    }
  } catch (error) {
    Logger.error('Error during bootstrap:', error);
  }
}

bootstrap();
