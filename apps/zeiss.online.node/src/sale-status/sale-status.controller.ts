import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Response } from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { CreateSaleStatusDto } from './dto/create-sale-status.dto';
import { UpdateSaleStatusDto } from './dto/update-sale-status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MapInterceptor, MapPipe } from '@automapper/nestjs';
import { SaleStatus } from './entities/sale-status.entity';
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
  create(@Body(MapPipe(CreateSaleStatusDto, SaleStatus)) saleStatus: SaleStatus) {
    const result = this.saleStatusService.create(saleStatus);
    return lastValueFrom(result);
  }

  @Get()
  @UseInterceptors(MapInterceptor(SaleStatus, SaleStatusDto, { isArray: true }))
  findAll(): Promise<SaleStatus[]> {
    const result = this.saleStatusService.findAll();
    return lastValueFrom(result);
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(SaleStatus, SaleStatusDto))
  findOne(@Param('id') id: string) : Promise<SaleStatus> {
    const result = this.saleStatusService.findOne(+id);
    return lastValueFrom(result);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(MapPipe(UpdateSaleStatusDto, SaleStatus)) saleStatus: SaleStatus) {
    return this.saleStatusService.update(+id, saleStatus);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.saleStatusService.remove(+id);
  }

  @Post('export')
  async exportXlsx(@Response() res) : Promise<void> {
    const workbookBuffer = this.saleStatusService.export();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx');
    // 将 Excel 文件的二进制流数据返回给客户端
    res.end(workbookBuffer, 'binary');
  }
}
