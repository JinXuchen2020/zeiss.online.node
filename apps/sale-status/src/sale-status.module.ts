import { Module } from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { SaleStatusController } from './sale-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleStatus } from './entities/sale-status.entity';
import { default as DatabaseModule } from './database.module';
import { SaleStatusProfile } from './sale-status.profile';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [AutomapperModule.forRoot({
              strategyInitializer: classes(),
            }),
            DatabaseModule, 
            TypeOrmModule.forFeature([SaleStatus])],
  controllers: [SaleStatusController],
  providers: [SaleStatusService, SaleStatusProfile],
})
export class SaleStatusModule {}
