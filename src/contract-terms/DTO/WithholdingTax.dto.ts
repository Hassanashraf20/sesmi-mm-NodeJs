import { IsBoolean, IsString } from 'class-validator';

export class WithholdingTaxDto {
  taxType: string;
  taxCode: string;
  exempted: boolean;
}
