import { Test, TestingModule } from '@nestjs/testing';
import { SaleStatusController } from './sale-status.controller';
import { SaleStatusService } from './sale-status.service';

describe('SaleStatusController', () => {
  let saleStatusController: SaleStatusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SaleStatusController],
      providers: [SaleStatusService],
    }).compile();

    saleStatusController = app.get<SaleStatusController>(SaleStatusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {      
    });
  });
});
