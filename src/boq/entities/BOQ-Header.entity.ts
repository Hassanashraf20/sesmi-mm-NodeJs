import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('BOQHEADER')
export class BOQHeader {
  @PrimaryColumn({ name: 'Boq', type: 'nvarchar' })
  boq: string;
  @Column({ name: 'Model', type: 'nvarchar', nullable: true })
  model?: string;
  @Column({ name: 'UsageType', type: 'nvarchar', nullable: true })
  usageType?: string;
  @Column({ name: 'DelInd', type: 'nvarchar', nullable: true })
  delInd?: string;
  @Column({ name: 'ModelType', type: 'nvarchar', nullable: true })
  modelType?: string;
  @Column({ name: 'Flag', type: 'nvarchar' })
  flag: string;
  @Column({ name: 'Description', type: 'nvarchar', length: 50, nullable: true })
  description?: string;
  @Column({ name: 'Project', type: 'nvarchar', length: 20, nullable: true })
  project?: string;
  @Column({ name: 'CompCode', type: 'nvarchar', length: 4, nullable: true })
  compCode?: string;
  @Column({ name: 'TotalQty', type: 'nvarchar', nullable: true })
  totalQty?: string;
  @Column({ name: 'Status', type: 'nvarchar', length: 25, nullable: true })
  status?: string;
}
