import { Controller } from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { SaleStatus } from './entities/sale-status.entity';
import * as XLSX from 'xlsx';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('saleInfos')
export class SaleStatusController {
  constructor(
    private readonly saleStatusService: SaleStatusService
  ) {}

  @EventPattern('sale_status_created')
  async create(saleStatus: SaleStatus) {
    return this.saleStatusService.create(saleStatus);
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll(): Promise<SaleStatus[]> {
    return this.saleStatusService.findAll();
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(id: string) : Promise<SaleStatus> {
    return this.saleStatusService.findOne(+id);
  }

  @EventPattern('sale_status_updated')
  async update(saleStatus: SaleStatus) {
    const id = saleStatus.id;    
    this.saleStatusService.update(+id, saleStatus);
  }

  @EventPattern('sale_status_deleted')
  async remove(id: string) {
    await this.saleStatusService.remove(+id);
  }

  @MessagePattern({ cmd: 'export' })
  async exportXlsx() : Promise<any> {
    const data = await this.saleStatusService.findAll();
    const workbook = XLSX.utils.book_new();
    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SaleStatus');
    const workbookBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx'
    });
    return workbookBuffer;
  }
}
