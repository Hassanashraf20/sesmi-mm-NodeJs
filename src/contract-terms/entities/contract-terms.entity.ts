import { ContractPOHeader } from 'src/contract-po/entities/contractP0.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
@Entity('ContHeader')
export class ContractTerms {
  @PrimaryColumn({ type: 'nvarchar' })
  ContractNo: ContractPOHeader;
  @PrimaryColumn({ type: 'nvarchar', length: 4 })
  Version: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  CompCode?: string;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Overviewstatus?: string;

  @Column({ type: 'nvarchar', length: 13, nullable: true })
  PoNumber?: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  TotalContractValue?: number;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  WfLastStep?: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  WfVersion?: string;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  Workitem?: string;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Userstatus?: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  ContractType?: string;

  @Column({ type: 'nvarchar', length: 220, nullable: true })
  Message?: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  PaymentTermsCode?: string;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  PoStatus?: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  PriceInclusive?: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  ProfitCenter?: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  ShipInvoicePerc?: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  VariationOriginalPer?: number;

  @Column({ type: 'date', nullable: true })
  DeliveryDate?: Date;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  InflationOriginalPer?: number;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  PaymentTermsDays?: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  ProfitCenterName?: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  VatCode?: string;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  RemeasuredOriginalPer?: number;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Status?: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  TaxCode?: string;

  @Column({ type: 'date', nullable: true })
  CreatedOn?: Date;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  VariationRevisitedPer?: number;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  CreatedBy?: string;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  InflationRevisitedPer?: number;

  @Column({ type: 'date', nullable: true })
  LastChangedOn?: Date;

  @Column({ type: 'decimal', precision: 15, scale: 3, nullable: true })
  RemeasuredRevisitedPer?: number;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  LastChangedBy?: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  UpdateInd?: string;
  @OneToOne(
    () => ContractPOHeader,
    (contractPOHeader) => contractPOHeader.contractTerms,
  )
  @JoinColumn({ name: 'PoNumber', referencedColumnName: 'PoNumber' })
  contractPOHeader?: ContractPOHeader;
}
