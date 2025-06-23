import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ContractPOHeader } from './contractP0.entity';
import { OrderHeader } from './orderHeader.entity';

@Entity('OrderItems')
export class OrderItems {
  @PrimaryColumn({ name: 'OrderItem', length: 4 })
  orderItem: string;

  @Column({ name: 'Amount', length: 16, nullable: true })
  amount: string;

  @Column({ name: 'ContractNo', length: 13 })
  contractNoValue: string;

  @Column({ name: 'DeleteInd', length: 1, nullable: true })
  deleteInd: string;

  @Column({ name: 'Group', length: 8, nullable: true })
  group: string;

  @Column({ name: 'OrderNo', length: 10 })
  orderNoValue: string;

  @Column({ name: 'UserOrder', length: 10, nullable: true })
  userOrder: string;

  @Column({ name: 'OrderType', length: 1, nullable: true })
  orderType: string;

  @Column({ name: 'Action', length: 1, nullable: true })
  action: string;

  @Column({ name: 'BuildingNo', length: 8, nullable: true })
  buildingNo: string;

  @Column({ name: 'Zzone', length: 10, nullable: true })
  zzone: string;

  @Column({ name: 'Model', length: 8, nullable: true })
  model: string;

  @Column({ name: 'ModelDesc', length: 50, nullable: true })
  modelDesc: string;

  @Column({ name: 'Boq', length: 8, nullable: true })
  boq: string;

  @Column({ name: 'BoqDesc', length: 50, nullable: true })
  boqDesc: string;

  // Relationships
  @ManyToOne(() => ContractPOHeader, (header) => header.orderItems)
  @JoinColumn({ name: 'ContractNo' })
  contractNo: ContractPOHeader;
  @ManyToOne(() => OrderHeader, (header) => header.orderItems)
  @JoinColumn({ name: 'OrderNo' })
  orderNo: OrderHeader;
}
