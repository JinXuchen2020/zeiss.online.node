import { NestFactory } from '@nestjs/core';
import { SaleStatusModule } from './sale-status.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SaleStatusModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      }
    });
  await app.listen();
}
bootstrap();
