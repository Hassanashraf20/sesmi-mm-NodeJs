import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractTerms } from './entities/contract-terms.entity';
import { Repository } from 'typeorm';
import { CreateContractTermsDto } from './DTO/createContractTerms.dto';
import { ContractPoService } from 'src/contract-po/contract-po.service';

@Injectable()
export class ContractTermsService {
  constructor(
    @InjectRepository(ContractTerms)
    private readonly ContractTermsRepository: Repository<ContractTerms>,
    private readonly contractPoHeader: ContractPoService,
  ) {}

  async createContractTerms(body: any): Promise<any> {
    const contractPurchDoc = body.ContractNo;
    const contractPoData =
      await this.contractPoHeader.GetPurchDoc(contractPurchDoc);
    console.log('contractPoData', contractPoData);
    if (!contractPoData || contractPoData.PurchDoc !== contractPurchDoc) {
      throw new BadRequestException(
        'ContractNo does not match any PONumber in contract PO header',
      );
    }
    const newContractTerms = this.ContractTermsRepository.create(body);
    const ContractTerms =
      await this.ContractTermsRepository.save(newContractTerms);
    return {
      msg: ' Contract Terms Added Succsesfully ',
      ContractTerms,
    };
  }

  async getContractTerms(ContractNo: any): Promise<ContractTerms[]> {
    const contractTerm = await this.ContractTermsRepository.find({
      where: { ContractNo: ContractNo },
    });
    if (!contractTerm) {
      throw new BadRequestException('ContractNo does not exist');
    }
    return contractTerm;
  }

  async getAllContractTerms(): Promise<any> {
    const contractTerms = await this.ContractTermsRepository.find();
    if (!contractTerms) {
      throw new BadRequestException('ContractTerms does not exist');
    }
    return {
      msg: 'Contract Terms Retrived Succsesfully ',
      Count: contractTerms.length,
      contractTerms,
    };
  }

  private createDownPayment() {}
  private createWithholdingTax() {}
  private getDownPaymentHistory() {}
}
