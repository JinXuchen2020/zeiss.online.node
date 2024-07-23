import { NestFactory } from '@nestjs/core';
import { SaleStatusModule } from './sale-status.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SaleStatusModule,
    {
      transport: Transport.TCP,
      host: '127.0.0.1',
      port: 3001,
    } as MicroserviceOptions
  );
  await app.listen();
}
bootstrap();
