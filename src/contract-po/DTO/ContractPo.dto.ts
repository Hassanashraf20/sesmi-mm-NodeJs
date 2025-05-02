import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractPOHeaderDto {
  @ApiProperty({ description: 'Flag indicator', required: false })
  flag?: string;

  @ApiProperty({ description: 'Document type', required: false })
  docType?: string;

  @ApiProperty({ description: 'Project identifier', required: false })
  project?: string;

  @ApiProperty({ description: 'Vendor identifier', required: false })
  vendor?: string;

  @ApiProperty({ description: 'Purchase organization', required: false })
  purchOrg?: string;

  @ApiProperty({ description: 'Purchase document number', required: false })
  purchDoc?: string;

  @ApiProperty({ description: 'Message content', required: false })
  message?: string;

  @ApiProperty({ description: 'Purchase group', required: false })
  purGroup?: string;

  @ApiProperty({ description: 'Company code', required: false })
  compCode?: string;

  @ApiProperty({ description: 'Document date', required: false })
  docDate?: string;

  @ApiProperty({ description: 'Validity period start', required: false })
  vperStart?: string;

  @ApiProperty({ description: 'Validity period end', required: false })
  vperEnd?: string;

  @ApiProperty({ description: 'Status of the contract', required: false })
  status?: string;

  @ApiProperty({ description: 'Delete indicator', required: false })
  deleteInd?: string;

  @ApiProperty({ description: 'Contract description', required: false })
  contractDesc?: string;

  @ApiProperty({ description: 'Long description', required: false })
  longDesc?: string;

  @ApiProperty({ description: 'Currency code', required: false })
  currency?: string;

  @ApiProperty({ description: 'Measurement method', required: false })
  measMethod?: string;

  @ApiProperty({ description: 'Construction type', required: false })
  constructionType?: string;

  @ApiProperty({ description: 'Reference contract', required: false })
  refContract?: string;

  @ApiProperty({ description: 'Creation date', required: false })
  creationDate?: string;

  @ApiProperty({ description: 'Valid from date', required: false })
  validFrom?: string;

  @ApiProperty({ description: 'Valid to date', required: false })
  validTo?: string;

  @ApiProperty({ description: 'Sign-in date', required: false })
  signinDate?: string;

  @ApiProperty({ description: 'Revised valid to date', required: false })
  revisedValidTo?: string;

  @ApiProperty({ description: 'Index month', required: false })
  indexMonth?: string;

  @ApiProperty({ description: 'Consultant identifier', required: false })
  consultant?: string;

  @ApiProperty({ description: 'Consultant name', required: false })
  consultantName?: string;

  @ApiProperty({ description: 'SS identifier', required: false })
  ss?: string;

  @ApiProperty({ description: 'IR identifier', required: false })
  ir?: string;

  @ApiProperty({ description: 'Superior WBS', required: false })
  superiorWbs?: string;

  @ApiProperty({ description: 'Creation type', required: false })
  creationType?: string;

  @ApiProperty({ description: 'Mark up value', required: true, type: Number })
  markUp: number;

  @ApiProperty({ description: 'Vendor name', required: false })
  vendorName?: string;

  @ApiProperty({ description: 'Estimated contract value', required: true, type: Number })
  estimatedContractValue: number;

  @ApiProperty({ description: 'Original contract value', required: true, type: Number })
  originalContractValue: number;

  @ApiProperty({ description: 'Total contract value', required: true, type: Number })
  totalContractValue: number;

  @ApiProperty({ description: 'Variation order value', required: true, type: Number })
  variationOrderValue: number;

  @ApiProperty({ description: 'Addendum value', required: true, type: Number })
  addendumValue: number;

  @ApiProperty({ description: 'Revised contract value', required: true, type: Number })
  revisedContractValue: number;

  @ApiProperty({ description: 'Service type', required: false })
  serType?: string;
}
