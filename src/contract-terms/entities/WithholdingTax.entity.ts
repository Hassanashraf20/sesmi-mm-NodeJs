import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContractTerms } from './contract-terms.entity';

@Entity()
export class WithholdingTax {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taxType: string;

  @Column()
  taxCode: string;

  @Column()
  exempted: boolean;

  @ManyToOne(() => ContractTerms, (terms) => terms.withholdingTaxes)
  contractTerms: ContractTerms;
}
