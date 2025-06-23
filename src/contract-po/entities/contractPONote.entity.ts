import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { ContractPOHeader } from './contractP0.entity';

@Entity('ContractPONote')
export class ContractPONote {
  @Column({ name: 'Flag', length: 1, nullable: true })
  flag: string;

  @Column({ name: 'NoteText', length: 255, nullable: true })
  noteText: string;

  // Relationship with ContractPOHeader
  @PrimaryColumn({ type: 'varchar', name: 'PoNumber', length: 13 })
  @ManyToOne(() => ContractPOHeader, (PoHeader) => PoHeader.notes)
  @JoinColumn({ name: 'PoNumber' })
  poNumber: ContractPOHeader;
}
