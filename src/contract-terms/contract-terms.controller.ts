import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ContractTermsService } from './contract-terms.service';
import { CreateContractTermsDto } from './DTO/createContractTerms.dto';

@Controller('contract-terms')
export class ContractTermsController {
  constructor(private readonly contractTermsService: ContractTermsService) {}
  @Post()
  async createContractTerms(@Body() contractTerms: CreateContractTermsDto) {
    return this.contractTermsService.createContractTerms(contractTerms);
  }

  @Get('/:contractId')
  async getContractTerms(contractId: string) {
    return this.contractTermsService.getContractTerms(contractId);
  }
}
