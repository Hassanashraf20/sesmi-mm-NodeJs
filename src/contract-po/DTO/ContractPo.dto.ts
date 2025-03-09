import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateContractPOHeaderDto {
  flag?: string;

  docType?: string;

  project?: string;

  vendor?: string;

  purchOrg?: string;

  purchDoc?: string;

  message?: string;

  purGroup?: string;

  compCode?: string;

  docDate?: Date;

  vperStart?: Date;

  vperEnd?: Date;

  status?: string;

  deleteInd?: string;

  contractDesc?: string;

  longDesc?: string;

  currency?: string;

  measMethod?: string;

  constructionType?: string;

  refContract?: string;

  creationDate?: Date;

  validFrom?: Date;

  validTo?: Date;

  signinDate?: Date;

  revisedValidTo?: Date;

  indexMonth?: string;

  consultant?: string;

  consultantName?: string;

  ss?: string;

  ir?: string;

  superiorWbs?: string;

  creationType?: string;

  markUp: number;

  vendorName?: string;

  estimatedContractValue: number;

  originalContractValue: number;

  totalContractValue: number;

  variationOrderValue: number;

  addendumValue: number;

  revisedContractValue: number;

  serType?: string;
}
