import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('SRV_DESC')
export class SRVDesc {
  @PrimaryColumn({ name: 'SERVICE', type: 'nvarchar', length: 18 })
  service: string;
  @Column({ name: 'MATKL', type: 'nvarchar', length: 9, nullable: true })
  matkl?: string;
  @Column({ name: 'MEINS', type: 'nvarchar', length: 3, nullable: true })
  meins?: string;
  @Column({ name: 'BKLAS', type: 'nvarchar', length: 4, nullable: true })
  bklas?: string;
  @Column({ name: 'SHORT_TEXT', type: 'nvarchar', length: 40, nullable: true })
  shortText?: string;
  @Column({ name: 'LONG_TEXT', type: 'nvarchar', length: 300, nullable: true })
  longText?: string;
}
