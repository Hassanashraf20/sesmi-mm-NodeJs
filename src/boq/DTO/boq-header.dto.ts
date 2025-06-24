import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateBOQHeaderDto {
  @IsNotEmpty()
  @IsString()
  boq: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  usageType?: string;

  @IsOptional()
  @IsString()
  delInd?: string;

  @IsOptional()
  @IsString()
  modelType?: string;

  @IsNotEmpty()
  @IsString()
  flag: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  project?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  compCode?: string;

  @IsOptional()
  @IsString()
  totalQty?: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  status?: string;
}
