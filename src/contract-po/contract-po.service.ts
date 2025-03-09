import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractPOHeader } from './contractP0.entity';
import { Repository } from 'typeorm';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { CreateContractPOHeaderDto } from './DTO/ContractPo.dto';

@Injectable()
export class ContractPoService {
  private readonly logger = new Logger(ContractPoService.name);
  constructor(
    @InjectRepository(ContractPOHeader)
    private readonly ContractPORepository: Repository<ContractPOHeader>,
  ) {}

  async createContractPOHeader(
    req: any,
    createContractPODto: CreateContractPOHeaderDto,
  ) {
    this.logger.log('Starting createContractPOHeader...');
    const authHeader = {
      Authorization:
        'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'),
      Cookie: 'sap-usercontext=sap-client=210',
      'x-csrf-token': 'Fetch',
    };
    try {
      console.log('HERERERERERERERER');
      // Step 1: Fetch CSRF Token
      const csrfResponse = await executeHttpRequest(
        {
          url: 'http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/',
        },
        {
          method: 'GET',
          headers: authHeader,
        },
        { fetchCsrfToken: true },
      );
      if (!csrfResponse.headers || !csrfResponse.headers['x-csrf-token']) {
        console.error('CSRF Token missing from response', csrfResponse);
        throw new InternalServerErrorException('CSRF Token missing');
      }
      const csrfToken = csrfResponse.headers['x-csrf-token'];
      // Step 2: Send Data to SAP
      req.headers['x-csrf-token'] = csrfToken;
      console.log('csrf', csrfToken);

      const response = await executeHttpRequest(
        {
          url: 'http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/ContractPOHeaderSet?sap-client=210',
        },
        {
          method: 'POST',
          data: CreateContractPOHeaderDto,
          headers: {
            Authorization:
              'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'),
            Cookie: 'sap-usercontext=sap-client=210',
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      );
      this.logger.debug('Response received from SAP.');
      const poNumber = response.data.d.PoNumber || req.PoNumber || '';
      console.log('poNum', poNumber);

      if (!poNumber) {
        // this.logger.warn('PoNumber not found in response.');
        throw new HttpException(
          'PoNumber not found in response',
          HttpStatus.BAD_REQUEST,
        );
      }
      const contractPO = this.ContractPORepository.create({
        poNumber: poNumber,
        ...createContractPODto,
        markUp: parseFloat(createContractPODto.markUp?.toString()) || 0,
        estimatedContractValue:
          parseFloat(createContractPODto.estimatedContractValue?.toString()) ||
          0,
        originalContractValue:
          parseFloat(createContractPODto.originalContractValue?.toString()) ||
          0,
        totalContractValue:
          parseFloat(createContractPODto.totalContractValue?.toString()) || 0,
        variationOrderValue:
          parseFloat(createContractPODto.variationOrderValue?.toString()) || 0,
        addendumValue:
          parseFloat(createContractPODto.addendumValue?.toString()) || 0,
        revisedContractValue:
          parseFloat(createContractPODto.revisedContractValue?.toString()) || 0,
      });

      const savedData = await this.ContractPORepository.save(contractPO);
      this.logger.log('Contract PO saved successfully.');
      return {
        success: true,
        message: 'Contract PO created successfully',
        PoNumber: poNumber,
        data: savedData,
      };
    } catch (error) {
      // this.logger.error('Error executing the request', error.stack);
      throw new InternalServerErrorException(
        'Failed to create contract PO header.',
      );
    }
  }
}
