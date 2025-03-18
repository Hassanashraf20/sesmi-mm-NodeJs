import {
  BadRequestException,
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
import { ConfigService } from '@nestjs/config';
import { request } from 'http';

@Injectable()
export class ContractPoService {
  private readonly logger = new Logger(ContractPoService.name);
  constructor(
    @InjectRepository(ContractPOHeader)
    private readonly ContractPORepository: Repository<ContractPOHeader>,
    private readonly configService: ConfigService,
  ) {}

  async createContractPOHeader(req: any) {
    this.logger.log('Starting createContractPOHeader...');

    const formatDateFields = (dto: any) => {
      const dateFields = [
        'DocDate',
        'VperStart',
        'VperEnd',
        'CreationDate',
        'ValidFrom',
        'ValidTo',
        'SigninDate',
        'RevisedValidTo',
      ];

      dateFields.forEach((field) => {
        if (
          dto[field] &&
          typeof dto[field] === 'string' &&
          dto[field].trim() !== ''
        ) {
          dto[field] = dto[field] + 'T00:00:00';
        }
      });

      return dto;
    };
    let formattedDto = formatDateFields(req.body);

    const authHeader = {
      Authorization:
        'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'),
      Cookie: 'sap-usercontext=sap-client=210',
      'x-csrf-token': 'Fetch',
    };
    try {
      console.log('HERERERERERER');
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
          data: formattedDto,
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
      let poNumber = response.data.d.PoNumber || req.PoNumber || '';
      console.log('poNumm', poNumber);

      if (!poNumber) {
        throw new HttpException(
          'PoNumber not found in response',
          HttpStatus.BAD_REQUEST,
        );
      }
      const contractPO = this.ContractPORepository.create({
        ...req.body,
        PoNumber: poNumber,
        MarkUp: parseFloat(req.body.MarkUp?.toString()) || 0,
        EstimatedContractValue:
          parseFloat(req.body.EstimatedContractValue?.toString()) || 0,
        OriginalContractValue:
          parseFloat(req.body.OriginalContractValue?.toString()) || 0,
        TotalContractValue:
          parseFloat(req.body.TotalContractValue?.toString()) || 0,
        VariationOrderValue:
          parseFloat(req.body.VariationOrderValue?.toString()) || 0,
        AddendumValue: parseFloat(req.body.AddendumValue?.toString()) || 0,
        RevisedContractValue:
          parseFloat(req.body.RevisedContractValue?.toString()) || 0,
      });
      console.log('contractPOOOOOOO', contractPO);

      //ContractPOSERV POHeader -> PONumber esmo f l response POHeaderToItem
      //
      const savedData = await this.ContractPORepository.save(contractPO);
      this.logger.log('Contract PO saved successfully.');
      return {
        success: true,
        message: 'Contract PO created successfully',
        PoNumber: poNumber,
        data: savedData,
      };
    } catch (error) {
      this.logger.error('Error executing the request', error.stack);
      throw new InternalServerErrorException(
        'Failed to create contract PO header.',
      );
    }
  }

  async poExecuteAction(req: any) {
    console.log('Request Service', req.body);
    const csrfToken = await this.fetchCsrfToken();
    console.log(csrfToken);
    const {
      PoNo,
      Decision,
      Notes,
      WorkitemId,
      CreationType,
      OrderNo,
      ActionType,
      Comments,
    } = req.body;

    try {
      req.headers['x-csrf-token'] = csrfToken;
      const response = await executeHttpRequest(
        {
          url: `http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/POExecuteAction?PoNo='${PoNo}'&Decision='${Decision}'&Notes='${Notes}'&WorkitemId='${WorkitemId}'&CreationType='${CreationType}'&OrderNo='${OrderNo}'&ActionType='${ActionType}'&Comments='${Comments}'`,
        },
        {
          method: 'POST',
          headers: this.getSapHeaders(),
        },
      );

      return response.data.d;
    } catch (error) {
      this.logger.error('Error executing PO action:', error);
      throw new InternalServerErrorException('Failed to execute PO action.');
    }
  }

  private async fetchCsrfToken(): Promise<string> {
    try {
      const url = this.configService.get<string>('SAP_BASE_URL');
      console.log('url', url);
      if (!url) {
        throw new Error('SAP_BASE_URL is not defined in the configuration.');
      }

      const csrfResponse = await executeHttpRequest(
        { url },
        {
          method: 'GET',
          headers: {
            ...this.getSapHeaders(),
            'x-csrf-token': 'Fetch',
          },
        },
      );

      return csrfResponse.headers['x-csrf-token'];
    } catch (error) {
      this.logger.error('Error executing PO action:', error);
      throw new InternalServerErrorException('Failed to execute PO action.');
    }
  }
  private getSapHeaders() {
    return {
      Cookie: `sap-usercontext=sap-client=${this.configService.get('SAP_CLIENT')}`,
      Authorization:
        'Basic ' +
        Buffer.from(
          `${this.configService.get('SAP_USERNAME')}:${this.configService.get('SAP_PASSWORD')}`,
        ).toString('base64'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }


  async GetPOHeader(query: any) {
    try {
      if (query) {
        const poNumber = query.PoNumber;
        if (poNumber) {
          const poHeader = await this.ContractPORepository.findOne({
            where: { PoNumber: poNumber },
          });
          return {
            success: true,
            message: `Contract PO Headers: ${poHeader?.PoNumber} retrieved successfully`,
            data: poHeader,
          };
        }
      }
      const poHeaders = await this.ContractPORepository.find();
      this.logger.log(`Found ${poHeaders.length} records.`);
      return {
        success: true,
        message: 'Contract PO Headers retrieved successfully',
        data: poHeaders,
      };
    } catch (error) {
      this.logger.error('Error fetching Contract PO Headers:', error.stack);
      throw new InternalServerErrorException(
        'Failed to fetch Contract PO Headers.',
      );
    }
  }

}
