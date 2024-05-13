import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Access environment variables here
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb', // Use environment variable
        url: configService.get('MONGO_URL'), // Adjust for your database type
        entities: [__dirname + configService.get('TYPEORM_ENTITIES')],
        migrations: [configService.get('TYPEORM_MIGRATIONS')],
        logging: configService.get('TYPEORM_LOGGING') === 'true',
        synchronize: true,
        migrationsRun: configService.get('TYPEORM_MIGRATION_RUN') === 'true',
        migrationsTableName: 'migrations',
      }),
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
