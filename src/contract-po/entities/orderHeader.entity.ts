import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ContractPOHeader } from './contractP0.entity';
import { OrderItems } from './orderItems.entity';

@Entity('OrderHeader')
export class OrderHeader {
  @PrimaryColumn({ name: 'OrderNo', length: 10 })
  orderNo: string;

  @Column({
    name: 'AddValues',
    type: 'decimal',
    precision: 17,
    scale: 2,
    nullable: true,
  })
  addValues: number;

  @Column({ name: 'DaysNo', length: 3, nullable: true })
  daysNo: string;

  @Column({ name: 'ChangeInd', length: 1, nullable: true })
  changeInd: string;

  @Column({ name: 'MonthNo', length: 3, nullable: true })
  monthNo: string;

  @Column({
    name: 'OmissionValues',
    type: 'decimal',
    precision: 17,
    scale: 2,
    nullable: true,
  })
  omissionValues: number;

  @Column({ name: 'WfStatus', length: 25, nullable: true })
  wfStatus: string;

  @Column({
    name: 'ChangeAmount',
    type: 'decimal',
    precision: 17,
    scale: 2,
    nullable: true,
  })
  changeAmount: number;

  @Column({ name: 'Currency', length: 5, nullable: true })
  currency: string;

  @Column({ name: 'ContractNo', length: 13 })
  contractNoValue: string;

  @Column({ name: 'VarStatus', length: 1, nullable: true })
  varStatus: string;

  @Column({ name: 'UserOrder', length: 10, nullable: true })
  userOrder: string;

  @Column({ name: 'OrderType', length: 1, nullable: true })
  orderType: string;

  @Column({ name: 'OrderDesc', length: 50, nullable: true })
  orderDesc: string;

  @Column({ name: 'Type', length: 2, nullable: true })
  type: string;

  @Column({ name: 'OrderDate', type: 'date', nullable: true })
  orderDate: Date;

  @Column({ name: 'MonthIndex', length: 50, nullable: true })
  monthIndex: string;

  @Column({ name: 'Action', length: 1, nullable: true })
  action: string;

  @Column({ name: 'Status', length: 1, nullable: true })
  status: string;

  @Column({ name: 'Meins', length: 3, nullable: true })
  meins: string;
  // Relationships
  @ManyToOne(() => ContractPOHeader, (header) => header.orderHeaders)
  @JoinColumn({ name: 'ContractNo' })
  contractNo: ContractPOHeader;
  @OneToMany(() => OrderItems, (orderItem) => orderItem.orderNo)
  orderItems: OrderItems[];
}
