import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }), // Specify the .env file
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
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
