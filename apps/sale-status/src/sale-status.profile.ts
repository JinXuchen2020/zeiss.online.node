import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from '@nestjs/common';
import { SaleStatus } from "./entities/sale-status.entity";
import { CreateSaleStatusDto } from "./dto/create-sale-status.dto";
import { SaleStatusDto } from "./dto/sale-status.dto";
import { UpdateSaleStatusDto } from "./dto/update-sale-status.dto";

@Injectable()
export class SaleStatusProfile extends AutomapperProfile {
  constructor(
    @InjectMapper() mapper: Mapper
  ) {
    super(mapper);
  }
  
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, SaleStatus, SaleStatusDto, 
        forMember((des) => des.linkUpDate, mapFrom((src) => src.linkUpDate ? src.linkUpDate.toLocaleDateString() : null)),
        forMember((des) => des.bidDate, mapFrom((src) => src.bidDate ? src.bidDate.toLocaleDateString() : null)),
        forMember((des) => des.visitDate, mapFrom((src) => src.visitDate ? src.visitDate.toLocaleDateString() : null)),
        forMember((des) => des.bidConfirmDate, mapFrom((src) => src.bidConfirmDate ? src.bidConfirmDate.toLocaleDateString() : null)), 
        forMember((des) => des.contractDate, mapFrom((src) => src.contractDate ? src.contractDate.toLocaleDateString() : null)),
        forMember((des) => des.sendDate, mapFrom((src) => src.sendDate ? src.sendDate.toLocaleDateString() : null)),
        forMember((des) => des.remarkDate, mapFrom((src) => src.remarkDate ? src.remarkDate.toLocaleDateString() : null)),
      );
      createMap(mapper, CreateSaleStatusDto, SaleStatus, 
        forMember((des) => des.linkUpDate, mapFrom((src) => src.linkUpDate ? new Date(src.linkUpDate) : null)),
        forMember((des) => des.bidDate, mapFrom((src) => src.bidDate ? new Date(src.bidDate) : null)),
        forMember((des) => des.visitDate, mapFrom((src) => src.visitDate ? new Date(src.visitDate) : null)),
        forMember((des) => des.bidConfirmDate, mapFrom((src) => src.bidConfirmDate ? new Date(src.bidConfirmDate) : null)), 
        forMember((des) => des.contractDate, mapFrom((src) => src.contractDate ? new Date(src.contractDate) : null)),
        forMember((des) => des.sendDate, mapFrom((src) => src.sendDate ? new Date(src.sendDate) : null)),
        forMember((des) => des.remarkDate, mapFrom((src) => src.remarkDate ? new Date(src.remarkDate) : null)),
      );
      createMap(mapper, UpdateSaleStatusDto, SaleStatus,
        forMember((des) => des.linkUpDate, mapFrom((src) => src.linkUpDate ? new Date(src.linkUpDate) : null)),
        forMember((des) => des.bidDate, mapFrom((src) => src.bidDate ? new Date(src.bidDate) : null)),
        forMember((des) => des.visitDate, mapFrom((src) => src.visitDate ? new Date(src.visitDate) : null)),
        forMember((des) => des.bidConfirmDate, mapFrom((src) => src.bidConfirmDate ? new Date(src.bidConfirmDate) : null)), 
        forMember((des) => des.contractDate, mapFrom((src) => src.contractDate ? new Date(src.contractDate) : null)),
        forMember((des) => des.sendDate, mapFrom((src) => src.sendDate ? new Date(src.sendDate) : null)),
        forMember((des) => des.remarkDate, mapFrom((src) => src.remarkDate ? new Date(src.remarkDate) : null)),
      )
    };
  }
}
