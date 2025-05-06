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

  async createContractTerms(contractTerms: any): Promise<any> {
    const newContractTerms = this.ContractTermsRepository.create(contractTerms);
    return await this.ContractTermsRepository.save(newContractTerms);
  }

  async getContractTerms(ContractNo: any): Promise<ContractTerms[]> {
    return await this.ContractTermsRepository.find({
      where: { ContractNo: ContractNo },
    });
  }

  async getAllContractTerms() {
    return await this.ContractTermsRepository.find();
  }

  private createDownPayment() {}
  private createWithholdingTax() {}
  private getDownPaymentHistory() {}
}
