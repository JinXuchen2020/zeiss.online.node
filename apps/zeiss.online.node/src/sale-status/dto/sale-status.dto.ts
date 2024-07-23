import { AutoMap } from '@automapper/classes';

export class SaleStatusDto {
  @AutoMap()
  id: number;

  @AutoMap()
  companyName: string;

  @AutoMap()
  brandName?: string;

  @AutoMap()
  shopName?: string;

  @AutoMap()
  storeName?: string;

  @AutoMap()
  contactName?: string;

  @AutoMap()
  contactJob?: string;

  @AutoMap()
  contactPhone?: string;

  @AutoMap()
  salerName?: string;

  @AutoMap()
  successfulRate?: number;

  @AutoMap()
  linkUpDate?: string;

  @AutoMap()
  bidDate?: string;

  @AutoMap()
  visitDate?: string;

  @AutoMap()
  bidConfirmDate?: string;

  @AutoMap()
  contractDate?: string;

  @AutoMap()
  sendDate?: string;

  @AutoMap()
  remarkDate?: string;

  @AutoMap()
  isEditing: boolean;
}
