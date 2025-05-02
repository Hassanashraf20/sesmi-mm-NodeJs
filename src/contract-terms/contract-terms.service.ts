import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractTerms } from './entities/contract-terms.entity';
import { Repository } from 'typeorm';
import { CreateContractTermsDto } from './DTO/createContractTerms.dto';

@Injectable()
export class ContractTermsService {
  constructor(
    @InjectRepository(ContractTerms)
    private readonly ContractTermsRepository: Repository<ContractTerms>,
  ) {}

  async createContractTerms(
    contractTerms: CreateContractTermsDto,
  ): Promise<ContractTerms> {
    const downPayments = this.createDownPayment();
    const WithholdingTax = this.createWithholdingTax();
    contractTerms.downPayments = downPayments;
    contractTerms.withholdingTaxes = WithholdingTax;
    return await this.ContractTermsRepository.save(contractTerms);
  }

  async getContractTerms(contractId: string): Promise<ContractTerms[]> {
    return await this.ContractTermsRepository.find({
      where: { contractId: contractId },
    });
  }

  private createDownPayment() {}
  private createWithholdingTax() {}
  async getDownPaymentHistory() {}
}
