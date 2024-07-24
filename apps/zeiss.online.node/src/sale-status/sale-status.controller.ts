import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { CreateSaleStatusDto } from './dto/create-sale-status.dto';
import { UpdateSaleStatusDto } from './dto/update-sale-status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SaleStatusDto } from './dto/sale-status.dto';
import { lastValueFrom } from 'rxjs';

@Controller('saleInfos')
@ApiTags('SaleInfos')
@ApiBearerAuth()
export class SaleStatusController {
  constructor(
    private readonly saleStatusService: SaleStatusService
  ) {}

  @Post()
  async create(@Body() saleStatus: CreateSaleStatusDto): Promise<SaleStatusDto> {
    const result = this.saleStatusService.create(saleStatus);
    return lastValueFrom(result);
  }

  @Get()
  findAll(): Promise<SaleStatusDto[]> {
    const result = this.saleStatusService.findAll();
    return lastValueFrom(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<SaleStatusDto> {
    const result = this.saleStatusService.findOne(+id);
    return lastValueFrom(result);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() saleStatus: UpdateSaleStatusDto) {
    return this.saleStatusService.update(+id, saleStatus);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.saleStatusService.remove(+id);
  }

  @Post('export')
  async exportXlsx(@Response() res) : Promise<void> {
    const workbookBuffer = await lastValueFrom(this.saleStatusService.export());
    const data = new Uint8Array(workbookBuffer.data);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx');
    // 将 Excel 文件的二进制流数据返回给客户端
    res.end(data, 'binary');
  }
}
