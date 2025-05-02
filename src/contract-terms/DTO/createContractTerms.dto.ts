import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContractTermsDto {
  @IsNotEmpty()
  contractId: string;

  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  vendorId: string;

  @IsOptional()
  totalValue: number;

  @IsOptional()
  profit: number;

  @IsOptional()
  vatPercentage: number;

  // @IsArray()
  // withholdingTaxes: WithholdingTaxDto[];
  @IsOptional()
  withholdingTaxes: any;

  //   @IsArray()
  //   downPayments: DownPaymentDto[];
  @IsOptional()
  downPayments: any;

  @IsNotEmpty()
  @IsOptional()
  paymentTerms: string;

  @IsOptional()
  variationTolerance: number;

  @IsOptional()
  revisionTolerance: number;
}
