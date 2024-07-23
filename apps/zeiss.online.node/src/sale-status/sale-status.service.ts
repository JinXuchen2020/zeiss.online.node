import { Inject, Injectable } from '@nestjs/common';
import { SaleStatus } from './entities/sale-status.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class SaleStatusService {
  constructor(
    @Inject('SALE_STATUS_SERVICE') private client: ClientProxy,
  ) {

  }
  create(input: SaleStatus) {
    return this.client.emit<SaleStatus>('sale_status_created', input);
  }

  findAll() : Observable<SaleStatus[]> {
    const pattern = { cmd: 'findAll' };
    return this.client.send<SaleStatus[]>(pattern, {});
  }

  findOne(id: number) {
    const pattern = { cmd: 'findOne' };
    const payload = { id: id };
    return this.client.send<SaleStatus>(pattern, payload);
  }

  update(id: number, input: SaleStatus) {
    const payload = { 
      id: id,
      input: input
    };
    
    this.client.emit<SaleStatus>('sale_status_updated', payload);
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
