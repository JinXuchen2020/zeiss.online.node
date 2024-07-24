import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateSaleStatusDto } from './dto/create-sale-status.dto';
import { SaleStatusDto } from './dto/sale-status.dto';
import { UpdateSaleStatusDto } from './dto/update-sale-status.dto';

@Injectable()
export class SaleStatusService {
  constructor(
    @Inject('SALE_STATUS_SERVICE') private client: ClientProxy,
  ) {

  }
  create(input: CreateSaleStatusDto) {
    return this.client.emit<SaleStatusDto>('sale_status_created', input);
  }

  findAll() : Observable<SaleStatusDto[]> {
    const pattern = { cmd: 'findAll' };
    return this.client.send<SaleStatusDto[]>(pattern, {});
  }

  findOne(id: number) {
    const pattern = { cmd: 'findOne' };
    const payload = { id: id };
    return this.client.send<SaleStatusDto>(pattern, payload);
  }

  update(id: number, input: UpdateSaleStatusDto) {
    const payload = { 
      id: id,
      input: input
    };
    
    this.client.emit<SaleStatusDto>('sale_status_updated', payload);
  }

  remove(id: number) {
    const payload = { 
      id: id
    };
    this.client.emit<any>('sale_status_deleted', payload);
  }

  export() {
    const pattern = { cmd: 'export' };
    return this.client.send<any>(pattern, {});
  }
}
