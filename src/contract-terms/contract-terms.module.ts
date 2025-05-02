import { Module } from '@nestjs/common';
import { ContractTermsController } from './contract-terms.controller';
import { ContractTermsService } from './contract-terms.service';

@Module({
  controllers: [ContractTermsController],
  providers: [ContractTermsService]
})
export class ContractTermsModule {}
