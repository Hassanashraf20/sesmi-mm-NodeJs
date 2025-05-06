import { ContractPOHeader } from 'src/contract-po/contractP0.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('CONT_HEAD')
export class ContractTerms {
  // @PrimaryGeneratedColumn()
  // id: number;
  // @OneToOne(() => ContractPOHeader, (contract) => contract.PoNumber)
  // @PrimaryColumn({ type: 'nvarchar' })
  // ContractNo: ContractPOHeader;
  @PrimaryColumn({ type: 'nvarchar' })
  ContractNo: string;
  @PrimaryColumn({ type: 'decimal' })
  Version: number;

  @Column({ type: 'date', nullable: true })
  DeliveryDate?: Date;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Status?: string;

  @Column({ type: 'date', nullable: true })
  CreatedOn?: Date;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  CreatedBy?: string;

  @Column({ type: 'date', nullable: true })
  LastChangedOn?: Date;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  LastChangedBy?: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  ShipInvoicePerc?: number;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  CompCode?: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  PaymentTermsCode?: string;

  @Column({ type: 'decimal', precision: 3, scale: 0, nullable: true })
  PaymentTermsDays?: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  VariationOriginalPer?: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  InflationOriginalPer?: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  RemeasuredOriginalPer?: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  VariationRevisitedPer?: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  InflationRevisitedPer?: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  RemeasuredRevisitedPer?: number;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  ContractType?: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  ProfitCenter?: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  ProfitCenterName?: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  PriceInclusive?: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  VatCode?: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  TaxCode?: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  TaxAmount?: number;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  BaseAmount?: number;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Overviewstatus?: string;
}
