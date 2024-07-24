import { Controller, UseInterceptors } from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { SaleStatus } from './entities/sale-status.entity';
import * as XLSX from 'xlsx';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSaleStatusDto } from './dto/create-sale-status.dto';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SaleStatusDto } from './dto/sale-status.dto';
import { UpdateSaleStatusDto } from './dto/update-sale-status.dto';

@Controller('saleInfos')
export class SaleStatusController {
  constructor(
    private readonly saleStatusService: SaleStatusService,
    @InjectMapper() 
    private readonly mapper: Mapper,
  ) {}

  @EventPattern('sale_status_created')
  @UseInterceptors(MapInterceptor(SaleStatus, SaleStatusDto))
  async create(@Payload() saleStatus: CreateSaleStatusDto) {
    const result = this.mapper.map(saleStatus, CreateSaleStatusDto, SaleStatus);
    return this.saleStatusService.create(result);
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(): Promise<SaleStatusDto[]> {
    const result = await this.saleStatusService.findAll();    
    return result.map(item => this.mapper.map(item, SaleStatus, SaleStatusDto));
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload('id') id: string) : Promise<SaleStatusDto> {
    const result = await this.saleStatusService.findOne(+id);
    return this.mapper.map(result, SaleStatus, SaleStatusDto);
  }

  @EventPattern('sale_status_updated')
  async update(@Payload('id') id: string, @Payload('input') saleStatus: UpdateSaleStatusDto) {
    const result = this.mapper.map(saleStatus, UpdateSaleStatusDto, SaleStatus);
    this.saleStatusService.update(+id, result);
  }

  @EventPattern('sale_status_deleted')
  async remove(@Payload('id') id: string) {
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
