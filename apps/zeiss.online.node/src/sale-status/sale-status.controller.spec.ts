import { Test, TestingModule } from '@nestjs/testing';
import { SaleStatusController } from './sale-status.controller';
import { SaleStatusService } from './sale-status.service';
import { SaleStatusProfile } from './sale-status.profile';

describe('SaleStatusController', () => {
  let controller: SaleStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleStatusController],
      providers: [SaleStatusService, SaleStatusProfile],
    }).compile();

    controller = module.get<SaleStatusController>(SaleStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
