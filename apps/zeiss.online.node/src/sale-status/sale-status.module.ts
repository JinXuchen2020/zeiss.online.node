import { Module } from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { SaleStatusController } from './sale-status.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'SALE_STATUS_SERVICE',
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      }
    }
  ])],
  controllers: [SaleStatusController],
  providers: [SaleStatusService],
})
export class SaleStatusModule {}
