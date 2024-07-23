import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleStatus } from './entities/sale-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleStatusService {
  constructor(
    @InjectRepository(SaleStatus) private readonly saleStatusRepository: Repository<SaleStatus>,
  ) {

  }
  create(input: SaleStatus) {
    return this.saleStatusRepository.save(input);
  }

  findAll() : Promise<SaleStatus[]> {
    return this.saleStatusRepository.createQueryBuilder().getMany();
  }

  findOne(id: number) {
    return this.saleStatusRepository.createQueryBuilder().where("id = :id", { id: id }).getOne();
  }

  update(id: number, input: SaleStatus) {
    this.saleStatusRepository.update(id, input);
  }

  async remove(id: number) : Promise<void> {
    await this.saleStatusRepository.delete(id);
  }
}
