import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ContractPOHeader')
export class ContractPOHeader {
  @PrimaryColumn({ name: 'PONUMBER', type: 'nvarchar', length: 13 })
  poNumber: string;

  @Column({ name: 'FLAG', type: 'nvarchar', length: 1, nullable: true })
  flag: string;

  @Column({ name: 'DOCTYPE', type: 'nvarchar', length: 4 })
  docType: string;

  @Column({ name: 'PROJECT', type: 'nvarchar', length: 24 })
  project: string;

  @Column({ name: 'VENDOR', type: 'nvarchar', length: 13 })
  vendor: string;

  @Column({ name: 'PURCHORG', type: 'nvarchar', length: 4 })
  purchOrg: string;

  @Column({ name: 'PURCHDOC', type: 'nvarchar', length: 10, nullable: true })
  purchDoc: string;

  @Column({ name: 'MESSAGE', type: 'nvarchar', length: 220, nullable: true })
  message: string;

  @Column({ name: 'PURGROUP', type: 'nvarchar', length: 3 })
  purGroup: string;

  @Column({ name: 'COMPCODE', type: 'nvarchar', length: 4 })
  compCode: string;

  @Column({ name: 'DOCDATE', type: 'date', nullable: true })
  docDate: Date;

  @Column({ name: 'VPERSTART', type: 'date', nullable: true })
  vperStart: Date;

  @Column({ name: 'VPEREND', type: 'date', nullable: true })
  vperEnd: Date;

  @Column({ name: 'STATUS', type: 'nvarchar', length: 25, nullable: true })
  status: string;

  @Column({ name: 'DELETEIND', type: 'nvarchar', length: 1, nullable: true })
  deleteInd: string;

  @Column({ name: 'CONTRACTDESC', type: 'nvarchar', length: 40 })
  contractDesc: string;

  @Column({ name: 'LONGDESC', type: 'nvarchar', length: 300 })
  longDesc: string;

  @Column({ name: 'CURRENCY', type: 'nvarchar', length: 5 })
  currency: string;

  @Column({ name: 'MEASMETHOD', type: 'nvarchar', length: 4 })
  measMethod: string;

  @Column({ name: 'CONSTRUCTIONTYPE', type: 'nvarchar', length: 4 })
  constructionType: string;

  @Column({ name: 'REFCONTRACT', type: 'nvarchar', length: 55, nullable: true })
  refContract: string;

  @Column({ name: 'CREATIONDATE', type: 'date', nullable: true })
  creationDate: Date;

  @Column({ name: 'VALIDFROM', type: 'date', nullable: true })
  validFrom: Date;

  @Column({ name: 'VALIDTO', type: 'date', nullable: true })
  validTo: Date;

  @Column({ name: 'SIGNINDATE', type: 'date', nullable: true })
  signinDate: Date;

  @Column({ name: 'REVISEDVALIDTO', type: 'date', nullable: true })
  revisedValidTo: Date;

  @Column({ name: 'INDEXMONTH', type: 'nvarchar', length: 50, nullable: true })
  indexMonth: string;

  @Column({ name: 'CONSULTANT', type: 'nvarchar', length: 10, nullable: true })
  consultant: string;

  @Column({
    name: 'CONSULTANTNAME',
    type: 'nvarchar',
    length: 35,
    nullable: true,
  })
  consultantName: string;

  @Column({ name: 'SS', type: 'nvarchar', length: 60, nullable: true })
  ss: string;

  @Column({ name: 'IR', type: 'nvarchar', length: 60, nullable: true })
  ir: string;

  @Column({ name: 'SUPERIORWBS', type: 'nvarchar', length: 24, nullable: true })
  superiorWbs: string;

  @Column({ name: 'CREATIONTYPE', type: 'nvarchar', length: 1 })
  creationType: string;

  @Column({ name: 'MARKUP', type: 'decimal', precision: 3, scale: 1 })
  markUp: number;

  @Column({ name: 'VENDORNAME', type: 'nvarchar', length: 35 })
  vendorName: string;

  @Column({
    name: 'ESTIMATEDCONTRACTVALUE',
    type: 'decimal',
    precision: 17,
    scale: 2,
  })
  estimatedContractValue: number;

  @Column({
    name: 'ORIGINALCONTRACTVALUE',
    type: 'decimal',
    precision: 17,
    scale: 2,
  })
  originalContractValue: number;

  @Column({
    name: 'TOTALCONTRACTVALUE',
    type: 'decimal',
    precision: 17,
    scale: 2,
  })
  totalContractValue: number;

  @Column({
    name: 'VARIATIONORDERVALUE',
    type: 'decimal',
    precision: 17,
    scale: 2,
  })
  variationOrderValue: number;

  @Column({ name: 'ADDENDUMVALUE', type: 'decimal', precision: 17, scale: 2 })
  addendumValue: number;

  @Column({
    name: 'REVISEDCONTRACTVALUE',
    type: 'decimal',
    precision: 17,
    scale: 2,
  })
  revisedContractValue: number;

  @Column({ name: 'SERTYPE', type: 'nvarchar', length: 4, nullable: true })
  serType: string;
}
