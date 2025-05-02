import { ContractPOHeader } from 'src/contract-po/contractP0.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WithholdingTax } from './WithholdingTax.entity';
import { DownPayment } from './DownPayment.entity';
@Entity()
export class ContractTerms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @OneToOne(() => ContractPOHeader, (contract) => contract.contractId)
  //   contract: ContractPOHeader;
  @Column()
  contractId: string;

  @Column()
  companyId: string;

  @Column()
  projectId: string;

  @Column()
  vendorId: string;

  @Column('decimal')
  totalValue: number;

  @Column('decimal')
  profit: number;

  @Column('decimal')
  vatPercentage: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  poNumber: string;

  @Column()
  paymentTerms: string;

  @Column('decimal')
  variationTolerance: number;

  @Column('decimal')
  revisionTolerance: number;
  @Column()
  vat: string;

  @OneToMany(() => WithholdingTax, (tax) => tax.contractTerms)
  withholdingTaxes: WithholdingTax[];

  @OneToMany(() => DownPayment, (dp) => dp.contractTerms)
  downPayments: DownPayment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
