import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ContractPOHeader } from './contractP0.entity';
import { ContractPOItem } from './contractPOItem.entity';

@Entity('ContractPOSrvItem')
export class ContractPOSrvItem {
  @PrimaryColumn({ name: 'SrvNo', length: 10 })
  srvNo: string;

  @Column({ name: 'AsBuild2', length: 1, nullable: true })
  asBuild2: string;

  @Column({ name: 'DeletePo', length: 1, nullable: true })
  deletePo: string;

  @Column({ name: 'MatlGroupDesc', length: 20, nullable: true })
  matlGroupDesc: string;

  @Column({ name: 'PrItem', length: 5, nullable: true })
  prItem: string;

  @Column({
    name: 'PriceUnit',
    type: 'decimal',
    precision: 17,
    scale: 2,
    nullable: true,
  })
  priceUnit: number;

  @Column({
    name: 'Amount',
    type: 'decimal',
    precision: 17,
    scale: 2,
    nullable: true,
  })
  amount: number;

  @Column({ name: 'ProvisionRate', length: 10, nullable: true })
  provisionRate: string;

  @Column({ name: 'SrvType', length: 6, nullable: true })
  srvType: string;

  @Column({ name: 'Currency', length: 5, nullable: true })
  currency: string;

  @Column({ name: 'Network', length: 12, nullable: true })
  network: string;

  @Column({ name: 'ActivityNumber', length: 4, nullable: true })
  activityNumber: string;

  @Column({ name: 'AsbuildVar', length: 50, nullable: true })
  asbuildVar: string;

  @Column({
    name: 'AsBuilt',
    type: 'decimal',
    precision: 13,
    scale: 3,
    nullable: true,
  })
  asBuilt: number;

  @Column({ name: 'ChangeIndicator', length: 10, nullable: true })
  changeIndicator: string;

  @Column({ name: 'SrvLongText', length: 255, nullable: true })
  srvLongText: string;

  @Column({ name: 'SrvStatus', length: 2, nullable: true })
  srvStatus: string;

  @Column({ name: 'Status', length: 3, nullable: true })
  status: string;

  @Column({ name: 'Txt', length: 50, nullable: true })
  txt: string;

  @Column({ name: 'VariationOrder', length: 10, nullable: true })
  variationOrder: string;

  @Column({ name: 'AsBuild', length: 1, nullable: true })
  asBuild: string;

  @Column({ name: 'Change', length: 1, nullable: true })
  change: string;

  @Column({ name: 'ContractualIndicator', length: 1, nullable: true })
  contractualIndicator: string;

  @Column({ name: 'Project', length: 8, nullable: true })
  project: string;

  @Column({ name: 'ServiceType', length: 2, nullable: true })
  serviceType: string;

  @Column({ name: 'SubBoq', length: 4, nullable: true })
  subBoq: string;

  @Column({ name: 'PurchDoc', length: 10, nullable: true })
  purchDoc: string;

  @Column({ name: 'Servicedesc', length: 40, nullable: true })
  servicedesc: string;

  @Column({ name: 'PoHeader', length: 13 })
  poHeaderValue: string;

  @Column({ name: 'PoItem', length: 5 })
  poItemValue: string;

  @Column({ name: 'Serviceno', length: 18, nullable: true })
  serviceno: string;

  @Column({ name: 'DeleteInd', length: 1, nullable: true })
  deleteInd: string;

  @Column({ name: 'Plant', length: 4, nullable: true })
  plant: string;

  @Column({ name: 'MatlGroup', length: 9, nullable: true })
  matlGroup: string;

  @Column({
    name: 'Qty',
    type: 'decimal',
    precision: 13,
    scale: 3,
    nullable: true,
  })
  qty: number;

  @Column({ name: 'PoUnit', length: 3, nullable: true })
  poUnit: string;

  @Column({ name: 'ItemCat', length: 1, nullable: true })
  itemCat: string;

  @Column({ name: 'Acctasscat', length: 1, nullable: true })
  acctasscat: string;

  @Column({ name: 'ShortText', length: 40, nullable: true })
  shortText: string;

  @Column({ name: 'BaseUom', length: 3, nullable: true })
  baseUom: string;

  @Column({ name: 'WbsElement', length: 24, nullable: true })
  wbsElement: string;

  @Column({ name: 'NoLimit', length: 1, nullable: true })
  noLimit: string;

  @Column({ name: 'DeliveryDate', length: 10, nullable: true })
  deliveryDate: string;

  @Column({ name: 'LongText', length: 225, nullable: true })
  longText: string;

  @Column({ name: 'Boq', length: 8, nullable: true })
  boq: string;

  @Column({
    name: 'OvfTol',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  ovfTol: number;

  @Column({ name: 'Buildingno', length: 8, nullable: true })
  buildingno: string;

  // Relationships
  @ManyToOne(() => ContractPOHeader, (Poheader) => Poheader.PoNumber)
  @JoinColumn({ name: 'PoHeader' })
  poHeader: ContractPOHeader;

  @ManyToOne(() => ContractPOItem, (PoItem) => PoItem.poItem)
  @JoinColumn({ name: 'PoItem' })
  poItem: ContractPOItem;
}
