import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ContractTermsService } from './contract-terms.service';
import { CreateContractTermsDto } from './DTO/createContractTerms.dto';

@Controller('contract-terms')
export class ContractTermsController {
  constructor(private readonly contractTermsService: ContractTermsService) {}
  @Post()
  async createContractTerms(@Body() contractTerms: any) {
    return this.contractTermsService.createContractTerms(contractTerms);
  }

  @Get()
  async getAllContractTerms() {
    return this.contractTermsService.getAllContractTerms();
  }

  @Get('/:contractNo')
  async getContractTerms(@Param('contractNo') contractNo: string) {
    return this.contractTermsService.getContractTerms(contractNo);
  }
}
