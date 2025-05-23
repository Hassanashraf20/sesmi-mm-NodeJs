import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { ConfigService } from '@nestjs/config';
import { SapFetchService } from 'src/sap-fetch/sap-fetch.service';
import { ContractPOHeader } from './entities/contractP0.entity';
import { ContractPOItem } from './entities/contractPOItem.entity';
import { ContractPOSrvItem } from './entities/contractPOSrvItem.entity';
import { ContractPONote } from './entities/contractPONote.entity';
import { mapPoItemData } from './utils/mapPoItemData';
import { mapContractPOSrvItemData } from './utils/mapContractPOSrvItemData';

@Injectable()
export class ContractPoService {
  private readonly logger = new Logger(ContractPoService.name);
  constructor(
    private readonly sapFetch: SapFetchService,
    @InjectRepository(ContractPOHeader)
    private readonly ContractPORepository: Repository<ContractPOHeader>,
    @InjectRepository(ContractPOItem)
    private readonly ContractPOItemRepository: Repository<ContractPOItem>,
    @InjectRepository(ContractPOSrvItem)
    private readonly ContractPOSrvItemRepository: Repository<ContractPOSrvItem>,
    @InjectRepository(ContractPONote)
    private readonly ContractPONoteRepository: Repository<ContractPONote>,
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
    console.log('Formatted DTO:', JSON.stringify(formattedDto, null, 2));

    const csrfToken = await this.sapFetch.fetchCsrfToken();
    try {
      req.headers['x-csrf-token'] = csrfToken;
      const response = await executeHttpRequest(
        {
          url: 'http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/ContractPOHeaderSet?sap-client=210',
        },
        {
          method: 'POST',
          data: formattedDto,
          headers: this.sapFetch.getSapHeaders(),
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
    const csrfToken = await this.sapFetch.fetchCsrfToken();
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
          headers: this.sapFetch.getSapHeaders(),
        },
      );
      const po = response.data.d.poNumber;
      console.log('po', po);

      return response.data.d;
    } catch (error) {
      this.logger.error('Error executing PO action:', error);
      throw new InternalServerErrorException('Failed to execute PO action.');
    }
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

  async GetPoNumber(poNumber: any) {
    const PoNumber = await this.ContractPORepository.findOne({
      where: { PoNumber: poNumber },
    });
    return PoNumber;
  }

  async createContractPOItem(req: any) {
    console.log('req', req.PoHeader);
    const { PoItem, PoHeader } = req;
    const p = await this.GetPoNumber(PoHeader);
    if (!p) {
      throw new HttpException(
        'Contract PO Header not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!PoItem) {
      throw new HttpException(
        'Missing required fields in request body (PoItem, etc.)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const poItemData = mapPoItemData(req);
    const contractPOItem = this.ContractPOItemRepository.create(poItemData);

    try {
      const savedDataPOItem =
        await this.ContractPOItemRepository.save(contractPOItem);
      return {
        msg: 'Contract POItem created successfully',
        savedDataPOItem,
      };
    } catch (error) {
      console.error('Error saving POItem:', error);
      throw new HttpException(
        'Failed to create Contract POItem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createContractPOSrvItem(body: any) {
    const { SrvNo, PoItem, PoHeader } = body;
    const poItem = await this.ContractPOItemRepository.findOne({
      where: { PoItem: PoItem },
    });
    if (!poItem) {
      throw new HttpException(
        'Contract PO Item not Match or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const poHeader = await this.GetPoNumber(PoHeader);
    if (!poHeader) {
      throw new HttpException(
        'Contract PO Header not Match or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!SrvNo) {
      throw new HttpException('SrvNo is required', HttpStatus.BAD_REQUEST);
    }
    console.log('herre log :', SrvNo, poHeader, poItem);
    const poSRVItemData = mapContractPOSrvItemData(body);
    const contractPOSrvItem =
      this.ContractPOSrvItemRepository.create(poSRVItemData);
    const savedDataPOItem =
      await this.ContractPOSrvItemRepository.save(contractPOSrvItem);
    return {
      msg: ' Contract POItem created successfully',
      savedDataPOItem,
    };
  }
  async createContractPONote(body: any) {
    const poNumber = await this.GetPoNumber(body.poNumber);
    if (!poNumber && poNumber !== body.poNumber) {
      throw new HttpException(
        'Contract PO Number not Match or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const contractPONote = this.ContractPONoteRepository.create({
      ...body,
      PoNumber: poNumber,
    });
    const savedDataPONote =
      await this.ContractPONoteRepository.save(contractPONote);
    return {
      msg: ' Contract PONote created successfully',
      savedDataPONote,
    };
  }
}
