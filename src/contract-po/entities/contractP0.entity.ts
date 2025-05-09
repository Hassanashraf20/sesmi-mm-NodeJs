import { ContractTerms } from 'src/contract-terms/entities/contract-terms.entity';
import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { ContractPOItem } from './contractPOItem.entity';
import { ContractPOSrvItem } from './contractPOSrvItem.entity';
import { ContractPONote } from './contractPONote.entity';
import { OrderHeader } from './orderHeader.entity';

@Entity('ContractPOHeader')
export class ContractPOHeader {
  @PrimaryColumn({ name: 'PoNumber' })
  PoNumber: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  AsBuilt: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  CommencementId: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  ContDurationMonth: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  ContractTermsInd: string;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  LastChangedAsBuiltBy: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  ProcessContractValue: number;

  @Column({ type: 'nvarchar', length: 40, nullable: true })
  ProjectDesc: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  ContDurationDays: string;

  @Column({ type: 'date', nullable: true })
  DateOfApplying: Date;

  @Column({ type: 'decimal', nullable: true })
  Version: number;

  @Column({ type: 'date', nullable: true })
  CommencementDate: Date;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  EstimatedContractValue: number;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  OriginalContractValue: number;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Userstatus: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  TotalContractValue: number;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  Workitem: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  Exempted: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  VariationOrderValue: number;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  AddendumValue: number;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Overviewstatus: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  ReleaseStatus: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  RevisedContractValue: number;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  SerType: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  ContractTypeTxt: string;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  SerTypeDesc: string;

  @Column({ type: 'decimal', precision: 17, scale: 2, nullable: true })
  VariationOrderPre: number;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  CompDesc: string;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  PurchOrgTxt: string;

  @Column({ type: 'nvarchar', length: 35, nullable: true })
  ConsultantName: string;

  @Column({ type: 'nvarchar', length: 24, nullable: true })
  ProjetTemp: string;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  StatusOr: string;

  @Column({ type: 'nvarchar', length: 24, nullable: true })
  SuperiorWbs: string;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  TempStatus: string;

  @Column({ type: 'nvarchar', length: 35, nullable: true })
  VendorName: string;

  @Column({ type: 'nvarchar', length: 40, nullable: true })
  WbsDesc: string;

  @Column({ type: 'date', nullable: true })
  CreatedOn: Date;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  CreationType: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  MarkUp: number;

  @Column({ type: 'date', nullable: true })
  LastChangedOn: Date;

  @Column({ type: 'date', nullable: true })
  DocDate: Date;

  @Column({ type: 'date', nullable: true })
  VperStart: Date;

  @Column({ type: 'date', nullable: true })
  CreationDate: Date;

  @Column({ type: 'date', nullable: true })
  VperEnd: Date;

  @Column({ type: 'date', nullable: true })
  SigninDate: Date;

  @Column({ type: 'date', nullable: true })
  ValidFrom: Date;

  @Column({ type: 'date', nullable: true })
  ValidTo: Date;

  @Column({ type: 'date', nullable: true })
  RevisedValidTo: Date;

  @Column({ type: 'nvarchar', length: 24, nullable: true })
  Project: string;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  CreatedBy: string;

  @Column({ type: 'nvarchar', length: 220, nullable: true })
  Message: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  DocParNo: string;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  LastChangedBy: string;

  @Column({ type: 'nvarchar', length: 25, nullable: true })
  Status: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  DocumentId: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  Flag: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  PoStatus: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  PurchDoc: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  DocType: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  Vendor: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  PurchOrg: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  PurGroup: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  CompCode: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  MeasMethod: string;

  @Column({ type: 'nvarchar', length: 4, nullable: true })
  ConstructionType: string;

  @Column({ type: 'nvarchar', length: 55, nullable: true })
  RefContract: string;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  DeleteInd: string;

  @Column({ type: 'nvarchar', length: 5, nullable: true })
  Currency: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  IndexMonth: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  Consultant: string;

  @Column({ type: 'nvarchar', length: 60, nullable: true })
  Ss: string;

  @Column({ type: 'nvarchar', length: 60, nullable: true })
  Ir: string;

  @Column({ type: 'nvarchar', length: 40, nullable: true })
  ContractDesc: string;

  @Column({ type: 'nvarchar', length: 300, nullable: true })
  LongDesc: string;

  // @OneToOne(() => ContractTerms, (contractTerms) => contractTerms.ContractNo)
  // contractTerm: ContractTerms;
  // @OneToMany(() => ContractPOItem, item => item.poHeader)
  // poItems: ContractPOItem[];

  // @OneToMany(() => ContractPOSrvItem, srvItem => srvItem.poHeader)
  // poSrvItems: ContractPOSrvItem[];

  // @OneToMany(() => ContractPONote, note => note.poNumber)
  // notes: ContractPONote[];

  // @OneToMany(() => OrderHeader, order => order.contractNo)
  // orderHeaders: OrderHeader[];
}
