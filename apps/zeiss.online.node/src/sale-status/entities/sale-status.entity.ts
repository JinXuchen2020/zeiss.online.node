import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("SaleStatus")
export class SaleStatus {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  companyName: string;

  @AutoMap()
  @Column({nullable: true})
  brandName?: string;

  @AutoMap()
  @Column({nullable: true})
  shopName?: string;

  @AutoMap()
  @Column({nullable: true})
  storeName?: string;

  @AutoMap()
  @Column({nullable: true})
  contactName?: string;

  @AutoMap()
  @Column({nullable: true})
  contactJob?: string;

  @AutoMap()
  @Column({nullable: true})
  contactPhone?: string;

  @AutoMap()
  @Column({nullable: true})
  salerName?: string;

  @AutoMap()
  @Column({type: "decimal", precision: 5, scale: 2, nullable: true})
  successfulRate?: number;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  linkUpDate?: Date;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  bidDate?: Date;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  visitDate?: Date;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  bidConfirmDate?: Date;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  contractDate?: Date;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  sendDate?: Date;

  @AutoMap()
  @Column({type: "datetime", nullable: true})
  remarkDate?: Date;

  @AutoMap()
  @Column({default: false, type: "bit"})
  isEditing: boolean;  
}
