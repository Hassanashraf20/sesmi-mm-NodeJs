import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractTerms } from './entities/contract-terms.entity';
import { Repository } from 'typeorm';
import { CreateContractTermsDto } from './DTO/createContractTerms.dto';
import { ContractPOHeader } from 'src/contract-po/contractP0.entity';
import { ContractPoService } from 'src/contract-po/contract-po.service';

@Injectable()
export class ContractTermsService {
  constructor(
    @InjectRepository(ContractTerms)
    private readonly ContractTermsRepository: Repository<ContractTerms>,
    private readonly contractPoHeader: ContractPoService,
  ) {}

  async createContractTerms(contractTerms: any): Promise<any> {
    const contractTermsData = contractTerms.ContractNo;
    const contractPoHeader =
      this.contractPoHeader.GetPoNumber(contractTermsData);
    if (!contractPoHeader || contractPoHeader !== contractTermsData) {
      throw new Error(
        'ContractNo does not match any PONumber in contract PO header',
      );
    }
    const newContractTerms = this.ContractTermsRepository.create(contractTerms);
    const Contract_Terms =
      await this.ContractTermsRepository.save(newContractTerms);
    return {
      msg: ' Contract Terms Added Succsesfully ',
      Contract_Terms,
    };
  }

  async getContractTerms(ContractNo: any): Promise<ContractTerms[]> {
    return await this.ContractTermsRepository.find({
      where: { ContractNo: ContractNo },
    });
  }

  async getAllContractTerms(): Promise<ContractTerms[]> {
    return await this.ContractTermsRepository.find();
  }

  private createDownPayment() {}
  private createWithholdingTax() {}
  private getDownPaymentHistory() {}
}
